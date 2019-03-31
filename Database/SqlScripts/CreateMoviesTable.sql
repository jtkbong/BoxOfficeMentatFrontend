CREATE TABLE `boxofficementat`.`Movies` (
  `Id` VARCHAR(100) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Studio` VARCHAR(45) NOT NULL,
  `DomesticGross` INT NOT NULL,
  `Distributor` VARCHAR(45) NOT NULL,
  `ReleasedDate` DATE NOT NULL,
  `Genre` VARCHAR(45) NOT NULL,
  `RunTime` INT NOT NULL,
  `MpaaRating` VARCHAR(45) NOT NULL,
  `ProductionBudget` INT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC));