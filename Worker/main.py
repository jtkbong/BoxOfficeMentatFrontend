from movieScrapeTask import MovieScrapeTask
from peopleScrapeTask import PeopleScrapeTask
#from boxOfficeScrapeTask import BoxOfficeScrapeTask
from testMoviesScrapeTask import TestMoviesScrapeTask
from weeklyGrossScrapeTask import WeeklyGrossScrapeTask
from enum import Enum


class Mode(Enum):
    weeklyUpdate = 1
    brandNew = 2
    rebuildTables = 3


def run():
    print('Starting scraping data from boxofficemojo.com...')

    weekly_tasks = list()
    weekly_tasks.append(WeeklyGrossScrapeTask("WeeklyGross", [
        'Id',
        'MovieId',
        'WeeklyGross',
        'TheaterCount'
    ], True))

    rebuild_tables_tasks = list()
    rebuild_tables_tasks.append(MovieScrapeTask("Movies", [
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
    rebuild_tables_tasks.append(PeopleScrapeTask("People", [
        'Id',
        'Name',
        'Actor',
        'Director',
        'Producer',
        'ScreenWriter'
    ], False))

    #tasks.append(boxOfficeScrapeTask("boxOffice", ""))
    rebuild_tables_tasks.append(TestMoviesScrapeTask('TestMovies', [
        'Id',
        'Name',
        'Studio',
        'DomesticGross'
    ], False))

    for task in weekly_tasks:
        print('\tExecuting scrape task for table ' + task.tableName + '...', end='')
        task.execute()
        print('DONE!')
    print('Finished scraping data from boxofficemojo.com.')


if __name__ == '__main__':
    run()
