CREATE TABLE `boxofficementat`.`ForeignBoxOffice` (
  `Id` INT NOT NULL,
  `MovieId` VARCHAR(100) NOT NULL,
  `Country` VARCHAR(45) NOT NULL,
  `ReleasedDate` DATE NULL,
  `OpeningWeekend` VARCHAR(45) NULL,
  `Total` INT NOT NULL,
  `AsOfDate` DATE NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  FOREIGN KEY (MovieId) REFERENCES Movies(Id)
);
