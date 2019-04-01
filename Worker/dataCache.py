data = dict()


def setList(name, list):
    data[name] = list


def getList(name):
    if name in data:
        return data[name]
    return None
