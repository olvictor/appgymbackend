CREATE DATABASE appgym;


CREATE TABLE usuarios(
id SERIAL PRIMARY KEY,
username TEXT unique,
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

alter table usuarios
ALTER column user_photo SET DEFAULT 'https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png';

CREATE TABLE usuarios_info(
id SERIAL PRIMARY KEY,
usuario_id INT references usuarios(id) unique,
nome TEXT,
idade numeric,
altura numeric,
peso numeric,
sexo text,
imc numeric,
imc_classificacao text,
nivel_de_atividade text,
objetivo text
);


create table usuarios_registro_treinos(
id serial primary key,
musculos TEXT,
usuario_id INT references usuarios(id),
data_publicacao timestamp default now()
);

CREATE TABLE usuarios_metas (
id SERIAL PRIMARY KEY,
usuario_id INT REFERENCES usuarios(id),
titulo TEXT,
descricao TEXT,
data_inicio TIMESTAMP,
data_fim TIMESTAMP
);

create table usuarios_treino_semanal(
id SERIAL PRIMARY KEY,
usuario_id INT references usuarios(id) NOT NULL,
treino TEXT ,
dia_da_semana TEXT
);

CREATE TABLE tipos_de_treinos(
id SERIAL PRIMARY KEY,
tipo TEXT
);

insert into tipos_de_treinos(tipo) values
('biceps'),
('triceps'),
('costas'),
('peito'),
('perna'),
('ombro'),
('abdmomen'),
('cardio')