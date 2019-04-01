from scrapeTask import ScrapeTask
from scrapeUtil import scrapeTable, scrapeTables, scrapeTableRows, markDataFileAsDone, isDataFileComplete
from dataCache import setList, getList
from parsingUtil import *
import csv


class MovieScrapeTask(ScrapeTask):
    
    def scrape(self):
        studios = self.getStudiosList()
        for studio in studios:
            self.scrapeStudioMovies(studio['studioName'], studio['href'])
        self.scrapeSuccess = True
                            
    def getStudiosList(self):        
        studios = getList('Studios')
        if studios is None:
            studios = []
            tables = scrapeTables("https://www.boxofficemojo.com/studio/?view2=allstudios&view=company&p=.htm",
                                  {'border': '0', 'cellspacing': '1', 'cellpadding': '3'})
            for table in tables:
                for row in table.findAll('tr'):            
                    for cell in row.findAll('a'):         
                        if hasattr(cell, 'text'):
                            studioName = cell.text.replace('&nbsp;', '').replace('/', ''). \
                                replace('*', '').replace(' ', '')
                            if studioName is not None and studioName and 'Rank' and studioName != '':
                                href = cell.get('href')
                                studios.append({'studioName': studioName, 'href': href})
            setList('Studios', studios)
            studios = getList('Studios')
        return studios    
                            
    def scrapeStudioMovies(self, studioName, url):
        i = 1
        fileName = studioName + '_Movies.tsv'
        self.files.append(fileName)
        
        if not isDataFileComplete(fileName):
            outfile = open(fileName, "w", newline='')
            writer = csv.writer(outfile, delimiter='\t')
            while True:
                fullUrl = ("https://www.boxofficemojo.com/studio/" + url + "&page=%d") % i        
                rows = scrapeTableRows(fullUrl, attributes={'border': '0', 'cellspacing':'1', 'cellpadding':'5'})
                if len(rows) > 0:
                    for row in rows:            
                        cell = row.find('a')            
                        if hasattr(cell, 'text'):
                            movieName = cell.text.replace('&nbsp;', '')                
                            if movieName and movieName != 'Rank':
                                href = cell.get('href')
                                self.scrapeMovie(movieName, studioName, href, writer)
                    i+=1
                else:
                    break
            markDataFileAsDone(writer)
        else:
            print("Skipped scraping " + studioName)

    def scrapeMovie(self, movieName, studioName, url, writer):    
        fullUrl = "https://www.boxofficemojo.com" + url
        attributes = {'border': '0', 'cellspacing': '1', 'cellpadding': '4', 'bgcolor': '#dcdcdc', 'width': '95%'}
        table = scrapeTable(fullUrl, attributes)
        if hasattr(table, 'findAll'):
            cells = table.findAll('b')
            offset = 0
            if len(cells) == 8:
                offset += 1
            print(url)
            id = url[url.lower().index('id=') + 3:url.lower().index('.htm')]
            domesticGross = getIntFromDollarAmount(cells[0].text)
            distributor = cells[1 + offset].text
            releaseDate = getReleaseDate(cells[2 + offset].text).strftime("%Y-%m-%d")
            genre = cells[3 + offset].text
            runTime = getRunTimeInMinutes(cells[4 + offset].text)
            mpaaRating = cells[5 + offset].text
            productionBudget = getProductionBudget(cells[6 + offset].text)
            rowData = [id, movieName, studioName, domesticGross, distributor, releaseDate, genre, runTime, mpaaRating, productionBudget]
            writer.writerows([rowData])
