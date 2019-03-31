CREATE TABLE `boxofficementat`.`Credits` (
  `MovieId` VARCHAR(100) NOT NULL,
  `PersonId` VARCHAR(120) NOT NULL,
  `Relationship` VARCHAR(45) NOT NULL,
  FOREIGN KEY (MovieId) REFERENCES Movies(Id),
  FOREIGN KEY (PersonId) REFERENCES People(Id)
);
