from movieScrapeTask import MovieScrapeTask
from peopleScrapeTask import PeopleScrapeTask
#from boxOfficeScrapeTask import BoxOfficeScrapeTask
from testMoviesScrapeTask import TestMoviesScrapeTask
from weeklyGrossScrapeTask import WeeklyGrossScrapeTask


def run():
    print('Starting scraping data from boxofficemojo.com...')
    tasks = list()
    tasks.append(MovieScrapeTask("Movies", [
        'Id',
        'Name',
        'Studio',
        'DomesticGross',
        'Distributor',
        'ReleasedDate',
        'Genre',
        'RunTime',
        'MpaaRating',
        'ProductionBudget'
    ], False))
    tasks.append(PeopleScrapeTask("People", [
        'Id',
        'Name',
        'Actor',
        'Director',
        'Producer',
        'ScreenWriter'
    ], False))
    tasks.append(WeeklyGrossScrapeTask("WeeklyGross", [
        'Id',
        'MovieId',
        'WeeklyGross',
        'TheaterCount'
    ], True))
    #tasks.append(boxOfficeScrapeTask("boxOffice", ""))
    tasks.append(TestMoviesScrapeTask('TestMovies', ['Id', 'Name', 'Studio', 'DomesticGross'], False))
    for task in tasks:
        print('\tExecuting scrape task for table ' + task.tableName + '...', end='')
        task.execute()
        print('DONE!')
    print('Finished scraping data from boxofficemojo.com.')


run()
