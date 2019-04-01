from scrapetask import ScrapeTask
from scrapeutil import *
from datacache import *
from parsingutil import *
import csv


class MovieScrapeTask(ScrapeTask):
    
    def scrape(self):
        studios = self.getStudiosList()
        for studio in studios:
            self.scrapeStudioMovies(studio['studioName'], studio['href'])
        self.scrapeSuccess = True
                            
    def getStudiosList(self):        
        studios = get_list('Studios')
        if studios is None:
            studios = []
            tables = scrape_tables("https://www.boxofficemojo.com/studio/?view2=allstudios&view=company&p=.htm",
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
            set_list('Studios', studios)
            studios = get_list('Studios')
        return studios    
                            
    def scrapeStudioMovies(self, studioName, url):
        i = 1
        fileName = studioName + '_Movies.tsv'
        self.files.append(fileName)
        
        if not is_data_file_complete(fileName):
            outfile = open(fileName, "w", newline='')
            writer = csv.writer(outfile, delimiter='\t')
            while True:
                fullUrl = ("https://www.boxofficemojo.com/studio/" + url + "&page=%d") % i        
                rows = scrape_table_rows(fullUrl, attributes={'border': '0', 'cellspacing': '1', 'cellpadding': '5'})
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
            mark_data_file_complete(writer)
        else:
            print("Skipped scraping " + studioName)

    def scrapeMovie(self, movieName, studioName, url, writer):    
        fullUrl = "https://www.boxofficemojo.com" + url
        attributes = {'border': '0', 'cellspacing': '1', 'cellpadding': '4', 'bgcolor': '#dcdcdc', 'width': '95%'}
        table = scrape_table(fullUrl, attributes)
        if hasattr(table, 'findAll'):
            cells = table.findAll('b')
            offset = 0
            if len(cells) == 8:
                offset += 1
            print(url)
            id = url[url.lower().index('id=') + 3:url.lower().index('.htm')]
            domesticGross = dollar_text_to_int(cells[0].text)
            distributor = cells[1 + offset].text
            releaseDate = text_to_release_date(cells[2 + offset].text).strftime("%Y-%m-%d")
            genre = cells[3 + offset].text
            runTime = text_to_minutes(cells[4 + offset].text)
            mpaaRating = cells[5 + offset].text
            productionBudget = production_budget_to_int(cells[6 + offset].text)
            rowData = [id, movieName, studioName, domesticGross, distributor, releaseDate, genre, runTime, mpaaRating, productionBudget]
            writer.writerows([rowData])
