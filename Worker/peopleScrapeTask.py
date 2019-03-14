from scrapeTask import scrapeTask
from scrapeUtil import scrapeList, scrapeTableRows, markDataFileAsDone, isDataFileComplete
import csv

class peopleScrapeTask(scrapeTask):
    
    def scrape(self):
        self.people = {}    
        self.scrapePeople('Actor')
        self.scrapePeople('Director')
        self.scrapePeople('Producer')
        self.scrapePeople('Writer')
        
        fileName = 'People.tsv'
        outfile = open(fileName, "w", newline='')
        writer = csv.writer(outfile, delimiter='\t')
        for id, v in self.people.items():
            writer.writerows([[id, v[0], v[1]]])
        markDataFileAsDone(writer)
        self.files.append(fileName)
        self.scrapeSuccess = True

    def scrapePeople(self, type):        
        firstRowKeys = []    
        pageCount = 1
        scrape = True
        while scrape:
            fullUrl = ("https://www.boxofficemojo.com/people/?view=%s&p=.htm&pagenum=%d") % (type, pageCount)
            trs = scrapeTableRows(fullUrl, attributes={'border':'0', 'cellspacing':'1', 'cellpadding':'5', 'width':'98%'})
            searchType = 'view=' + type
            if len(trs) > 0:
                key = trs[1].text
                if key in firstRowKeys:
                    scrape = False
                    break
                else:
                    firstRowKeys.append(trs[1].text)
                    for row in trs:
                        for a in row.findAll('a'):
                            href = a.get(('href'))
                            if(searchType in href and 'chart' in href):
                                name = a.text.replace('&nbsp;', '')
                                id = href[href.index('id=') + 3:href.index('.htm')]
                                roles = self.getPersonRoles(type, href)
                                if id not in self.people:
                                    self.people[id] = [name, roles]
                    pageCount += 1
    
    def getPersonRoles(self, type, url):
        fullUrl = 'https://www.boxofficemojo.com/people/' + url.replace('./', '')
        navTabs = scrapeList(fullUrl, {'class':'nav_tabs'})
        roles = ''
        if navTabs == None:
            roles += type[0:1]
        else:
            for tab in navTabs.findAll('li'):
                roles += tab.text[0:1]
        return roles