CREATE DATABASE appgym;


CREATE TABLE usuarios(
id SERIAL PRIMARY KEY,
username TEXT unique,
email TEXT unique,
senha TEXT not null
);