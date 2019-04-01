from scrapeTask import ScrapeTask
from scrapeUtil import scrapeElements, scrapeTableRows, markDataFileAsDone, isDataFileComplete
from parsingUtil import *
import csv


class WeeklyGrossScrapeTask(ScrapeTask):
    
    def scrape(self):
        url = 'https://www.boxofficemojo.com/weekly/chart/'
        data = []
        rows = scrapeTableRows(url, attributes={'border':'0', 'cellspacing':'1', 'cellpadding':'5'})
        if len(rows) > 0:
            selectedRows = rows[1:-1]
            for row in selectedRows:
                cells = row.findAll('td')
                movieNameCell = row.find('a')
                href = movieNameCell.get('href')
                movieId = getIdFromUrl(href)
                weeklyGrossCell = cells[4]
                weeklyGross = getIntFromDollarAmount(weeklyGrossCell.text)
                theaterCountCell = cells[6]
                theaterCount = getIntValFromStr(theaterCountCell.text)
                data.append([movieId, weeklyGross, theaterCount])
        
        columnNames = ["MovieId", "WeeklyGross", "TheaterCount"]
        
        date = ''
        headers = scrapeElements('h2', url, None)
        for header in headers:
            if header.text != 'Weekly Box Office':
                date = header.text.replace(',', '')
        
        fileName = 'WeeklyGross_' + date + '.tsv'
        outfile = open(fileName, "w", newline='')
        writer = csv.writer(outfile, delimiter='\t')
        writer.writerows(data)
        markDataFileAsDone(writer)
        self.files.append(fileName)
        self.scrapeSuccess = True
