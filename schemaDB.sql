CREATE DATABASE appgym;


CREATE TABLE usuarios(
id SERIAL PRIMARY KEY,
username TEXT unique,
email TEXT unique,
senha TEXT not null
);


CREATE TABLE posts(
iD SERIAL PRIMARY KEY,
usuario_id INTEGER REFERENCES usuarios(id),
conteudo TEXT,
imagem_url TEXT,
data_publicacao timestamp default now()
);


CREATE TABLE comentarios(
id SERIAL PRIMARY KEY,
comentario TEXT,
usuario_id INT references usuarios(id),
post_id INT references posts(id),
data_comentario timestamp DEFAULT now()
);


ALTER TABLE usuarios
ADD COlumn user_photo TEXT;