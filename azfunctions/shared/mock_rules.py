def get_rules():
    return [{"in": ["critical", {"var": "msg"}]}, {"in": ["warning", {"var": "msg"}]}]
