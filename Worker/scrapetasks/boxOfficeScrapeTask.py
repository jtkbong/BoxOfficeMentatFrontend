from scrapetasks.scrapetask import ScrapeTask


class BoxOfficeScrapeTask(ScrapeTask):

    def scrape(self):
        print("box office" + str(self))
