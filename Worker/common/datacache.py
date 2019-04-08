data = dict()


def set_list(name, list_data):
    data[name] = list_data


def get_list(name):
    if name in data:
        return data[name]
    return None
