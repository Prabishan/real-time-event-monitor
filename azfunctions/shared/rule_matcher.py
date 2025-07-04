from json_logic import jsonLogic


def find_matching_rules(event, rules):

    return [rule for rule in rules if jsonLogic(rule, event)]
