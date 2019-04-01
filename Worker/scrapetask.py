from abc import ABC, abstractmethod
from sqlWriter import writeRowsToDatabaseWithRetries, clearDatabase
import os


class ScrapeTask(ABC):
    
    def __init__(self, t, c, e):
        self.tableName = t
        self.tableColumns = c
        self.enabled = e
        self.files = []
        self.scrapeSuccess = False
        self.clearDatabaseSuccess = False
        self.writeToDbSuccess = False
        self.cleanupSuccess = False
    
    def execute(self):
        if self.enabled:
            self.scrape()
            if self.scrapeSuccess:
                self.clearDatabase()
            if self.clearDatabaseSuccess:
                self.writeToDatabase()
            if self.writeToDbSuccess:
                self.cleanup()
        else:
            print("Task was disabled")
    
    @abstractmethod
    def scrape(self):
        pass
    
    def clearDatabase(self):
        clearDatabase(self.tableName)
        self.clearDatabaseSuccess = True

    def writeToDatabase(self):
        for fileName in self.files:
            file = open(fileName, "r")
            lines = file.readlines()
            writeRowsToDatabaseWithRetries(self.tableName, self.tableColumns, lines)
        self.writeToDbSuccess = True
        
    def cleanup(self):
        for file in self.files:
            os.remove(file)
        self.cleanupSuccess = True
