import requests
from bs4 import BeautifulSoup


def scrape_element(element_type, url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")    
    element = soup.find(element_type, attrs=attributes)
    return element


def scrape_elements(element_type, url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")    
    element = soup.findAll(element_type, attrs=attributes)
    return element


def scrape_list(url, attributes):
    return scrape_element('ul', url, attributes)


def scrape_table(url, attributes):
    return scrape_element('table', url, attributes)


def scrape_tables(url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")
    tables = soup.findAll('table', attrs=attributes)
    return tables


def scrape_table_rows(url, attributes):
    table = scrape_table(url, attributes)
    if hasattr(table, 'findAll'):
        rows = table.findAll('tr')
        return rows
    else:
        return []
