import csv
import requests
import datetime
import Common
from pathlib import Path
from bs4 import BeautifulSoup

doneIndicator = "###DONE###"

def scrapeElement(elementType, url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")    
    element = soup.find(elementType, attrs=attributes)
    return element

def scrapeElements(elementType, url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")    
    element = soup.findAll(elementType, attrs=attributes)
    return element

def scrapeList(url, attributes):
    return scrapeElement('ul', url, attributes)

def scrapeTable(url, attributes):
    return scrapeElement('table', url, attributes)

def scrapeTables(url, attributes):
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, features="html.parser")
    tables = soup.findAll('table', attrs=attributes)
    return tables

def scrapeTableRows(url, attributes):
    table = scrapeTable(url, attributes)
    if(hasattr(table, 'findAll')):
        rows = table.findAll('tr')
        return rows
    else:
        return []
    
def markDataFileAsDone(writer):
    writer.writerow([doneIndicator])
        
def isDataFileComplete(filePath):
    if not Path(filePath).is_file():
        return False
    content = Path(filePath).read_text()
    return content.endswith(doneIndicator + "\n")