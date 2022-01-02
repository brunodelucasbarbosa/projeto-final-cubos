create database modulo_05

create table usuarios (
  	id serial primary key,
  	name text not null,
    email text not null unique,
    password text not null,
	cpf VARCHAR(15) unique,
	phone varchar(18) unique
  );

create table clientes (
  	id serial primary key,
    usuario_id integer not null,
    nome text not null,
    email text not null unique,
  	cpf VARCHAR(15) unique,
  	telefone varchar(17) unique,
  	cep VARCHAR(10),
  	logradouro VARCHAR(150),
  	complemento VARCHAR(50),
  	bairro VARCHAR(50),
  	cidade VARCHAR(50),
  	uf CHAR(2),
    status_cliente text DEFAULT 'EM DIA' not null,
    foreign key (usuario_id) references usuarios (id)
 );

 create table cobrancas (
	  id serial primary key,
  	cliente_id integer not null,
  	descricao text not null,
  	data_vencimento date not null,
  	valor number not null,
  	status_cobranca text not null ,
    foreign key (cliente_id) references clientes(id)
);







