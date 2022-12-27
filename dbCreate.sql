-- -----------------------------------------------------
-- Schema mascotas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mascotas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mascotas` ;
USE `mascotas` ;

-- -----------------------------------------------------
-- Table `mascotas`.`mascotas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mascotas`.`mascotas1` (
  `idDatos` INT NOT NULL AUTO_INCREMENT,
  `TipoDeCaso` VARCHAR(255) NULL,
  `EstadoDelTramite` VARCHAR(255) NULL,
  `Ovservaciones` VARCHAR(255) NULL,
  `FechaInicio` VARCHAR(255) NULL,
  `TipoAnimal` VARCHAR(255) NULL,
  `RazaAnimal` VARCHAR(255) NULL,
  `SexoAnimal` VARCHAR(255) NULL,
  `Tamano` VARCHAR(255) NULL,
  `NumeroContactoGC` VARCHAR(255) NULL,
  `Imagen` VARCHAR(255) NULL,
  `Edad` VARCHAR(255) NULL,
  PRIMARY KEY (`idDatos`),
  UNIQUE INDEX `id_UNIQUE` (`idDatos` ASC) VISIBLE)
ENGINE = InnoDB;