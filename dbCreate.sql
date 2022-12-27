CREATE DATABASE mascotas;
use mascotas;
create table mascotas(
    idDatos int auto_increment,
	TipoDeCaso varchar(255) null,
	EstadoDelTramite varchar(255) null,
	Ovservaciones varchar(255) null,
	FechaInicio varchar(255) null,
	TipoAnimal varchar(255) null,
	RazaAnimal varchar(255) null,
	SexoAnimal varchar(255) null,
	Tamano varchar(255) null,
	NumeroContactoGC varchar(255) null,
	Imagen varchar(255) null,
	Edad varchar(255) null,
    primary key(idDatos)
);