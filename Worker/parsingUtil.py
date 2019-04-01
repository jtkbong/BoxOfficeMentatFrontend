import datetime


def getIntFromDollarAmount(text):
    return float(text.strip('$').replace(',','').replace(' ', '').replace('(Estimate)', ''))


def getReleaseDate(text):
    if ',' not in text:
        if len(text) == 4:
            return datetime.datetime(int(text), 12, 31)
        else:
            return datetime.datetime(int(text[-4::]), datetime.datetime.strptime(text[0:text.index(' ')], '%B').month, 1)
    
    return datetime.datetime.strptime(text, '%B %d, %Y')


def getRunTimeInMinutes(text):
    if text=='N/A':
        return None
    
    hours = int(text[0:text.index('hrs.')])
    minutes = int(text[text.index('.') + 1:text.index('min.')])
    return 60 * hours + minutes


def getProductionBudget(text):
    if(text=='N/A'):
        return None
    return getIntFromDollarAmount(text.replace('million','000000'))


def getIdFromUrl(url):
    if url is None or 'id=' not in url:
        return None
    return url[url.index('id=') + 3 : url.index('.htm')]


def getIntValFromStr(s):
    return int(s.replace(',', ''))
