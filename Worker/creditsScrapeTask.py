from scrapetask import ScrapeTask


class CreditsScrapeTask(scrapeTask):

    def scrape(self):
        studios = self.getStudiosList()
        for studio in studios:
            self.scrapeStudioMovies(studio['studioName'], studio['href'])
        self.scrapeSuccess = True
