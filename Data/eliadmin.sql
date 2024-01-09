DROP DATABASE IF EXISTS eliadmin;
CREATE DATABASE eliadmin;
USE eliadmin;

CREATE TABLE `eliadmin`.`parroquia` (
	`id` 	 SMALLINT 	 NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(60) NOT NULL,
    `estatus` TINYINT,
    PRIMARY KEY( `id` )
) ENGINE = InnoDB;

INSERT INTO `eliadmin`.`parroquia` (`nombre`, `estatus`) VALUES( 'NUESTRA SEÑORA DE GUADALUPE', 1 );
INSERT INTO `eliadmin`.`parroquia` (`nombre`, `estatus`) VALUES( 'NUESTRA SEÑORA DE GUADALUPE Y DIVINO NIÑO', 1 );
INSERT INTO `eliadmin`.`parroquia` (`nombre`, `estatus`) VALUES( 'LA SANTA CRUZ', 1 );

CREATE TABLE `eliadmin`.`catolico` (
  `id` 				 SMALLINT 	 NOT NULL AUTO_INCREMENT,
  `nombre` 			 VARCHAR(20) NOT NULL,
  `apellido_paterno` VARCHAR(15) NOT NULL,
  `apellido_materno` VARCHAR(15) NOT NULL,
  `numero_celular`	 VARCHAR(20),
  `fecha_nacimiento` DATE,
  PRIMARY KEY( `id` )
) ENGINE = InnoDB;

CREATE TABLE `eliadmin`.`clero` (
	`id` 	  SMALLINT NOT NULL AUTO_INCREMENT,
    `funcion` CHAR,
    PRIMARY KEY( `id` )
) ENGINE = InnoDB;
ALTER TABLE `eliadmin`.`clero` ADD CONSTRAINT `fk_catolico`
	FOREIGN KEY( `id` ) REFERENCES `eliadmin`.`catolico`( `id` )
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE `eliadmin`.`centro` (
    `id` 		SMALLINT 	NOT NULL,
    `nombre`    VARCHAR(60) NOT NULL,
    `estatus` 	TINYINT,
    PRIMARY KEY( `id` )
) ENGINE = InnoDB;
ALTER TABLE `eliadmin`.`centro` ADD CONSTRAINT `fk_parroquia` FOREIGN KEY( `id` )
	REFERENCES `eliadmin`.`parroquia`( `id` ) 
	ON UPDATE CASCADE
    ON DELETE CASCADE;