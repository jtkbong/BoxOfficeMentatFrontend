from scrapeTask import scrapeTask
import scrapeUtil
import sqlWriter
from scrapeUtil import scrapeTable, scrapeTables, scrapeTableRows, markDataFileAsDone, isDataFileComplete
import datetime
from dataCache import setList, getList
import csv

class creditsScrapeTask(scrapeTask):
    
    def scrape(self):
        studios = self.getStudiosList()
        for studio in studios:
            self.scrapeStudioMovies(studio['studioName'], studio['href'])
        self.scrapeSuccess = True