import azure.functions as func
import datetime
import json
import logging
from shared.rule_matcher import find_matching_rules
from shared.mock_rules import get_rules
from shared.db_utils import save_event_and_rule

app = func.FunctionApp()


@app.function_name("event_push_trigger")
@app.route(route="event_push", auth_level=func.AuthLevel.ANONYMOUS)
@app.service_bus_queue_output(
    arg_name="message",
    queue_name="event-queue",
    connection="ServiceBusConnectionString",
)
def event_push(
    req: func.HttpRequest, message: func.Out[str], context: func.Context
) -> func.HttpResponse:
    logging.info("Python HTTP trigger function processed a request.")

    try:
        req_body = req.get_json().get("payload", {})
        if not req_body:
            logging.error("No payload found in the request body.")
            return func.HttpResponse(
                "Bad Request: No payload provided.", status_code=400
            )
        logging.info(f"Received payload: {req_body}")
        enriched_event = {
            "event": req_body,
            "invocation_id": context.invocation_id,
        }

        message.set(json.dumps(enriched_event))
        logging.info(f"Enriched event set for output: {enriched_event}")

        return func.HttpResponse(
            "Event sent to ServiceBus successfully.", status_code=200
        )

    except Exception as e:
        logging.error(f"Error in event_push: {str(e)}")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)


@app.function_name("event_filter")
@app.service_bus_queue_trigger(
    arg_name="data",
    queue_name="event-queue",
    connection="ServiceBusConnectionString",
)
def event_filter(data: func.ServiceBusMessage, context: func.Context) -> None:
    logging.info(f"Processing message: {data.get_body().decode('utf-8')}")
    raw_body = json.loads(data.get_body().decode("utf-8"))
    event = raw_body.get("event", {})
    rules = get_rules()

    matched_rules = find_matching_rules(event, rules)
    if matched_rules:
        logging.info(f"Matched rule: {matched_rules}")
        for rule in matched_rules:
            try:
                save_event_and_rule(event, rule)
            except Exception as e:
                logging.error(f"Error saving event and rule: {str(e)}")
    else:
        logging.info("No matching rule found.")
