from movieScrapeTask import movieScrapeTask
from peopleScrapeTask import peopleScrapeTask
#from boxOfficeScrapeTask import boxOfficeScrapeTask
from testMoviesScrapeTask import testMoviesScrapeTask
from weeklyGrossScrapeTask import weeklyGrossScrapeTask

def run():
    print('Starting scraping data from boxofficemojo.com...')
    tasks = []
    tasks.append(movieScrapeTask("Movies", [
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
    tasks.append(peopleScrapeTask("People", [
        'Id',
        'Name',
        'Actor',
        'Director',
        'Producer',
        'ScreenWriter'
    ], False))
    tasks.append(weeklyGrossScrapeTask("WeeklyGross", [
        'Id',
        'MovieId',
        'WeeklyGross',
        'TheaterCount'
    ], True))
    #tasks.append(boxOfficeScrapeTask("boxOffice", ""))
    tasks.append(testMoviesScrapeTask('TestMovies', ['Id', 'Name', 'Studio', 'DomesticGross'], False))
    for task in tasks:
        print('\tExecuting scrape task for table ' + task.tableName + '...', end='')
        task.execute()
        print('DONE!')
    print('Finished scraping data from boxofficemojo.com.')

run()