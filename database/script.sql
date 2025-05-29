#Cria o database
create database db_controle_jogos_bb;

#Ativa o database a ser utilizado
use db_controle_jogos_bb;

#Cria a tabela de jogos
create table tbl_jogo (
	id 				int not null primary key auto_increment,
	nome 			varchar(80) not null,
    data_lancamento date not null,
    versao			varchar(10) not null,
    tamanho 		varchar(10),
    descricao 		text,
    foto_capa 		varchar(200),
    link 			varchar(200)
);

CREATE TABLE tbl_cidade_jogador (
    id_cidade_jogador INT PRIMARY KEY, 
    email VARCHAR(60),
    nome VARCHAR(45),
    pais VARCHAR(100),
    ano_contrato VARCHAR(4)
);

CREATE TABLE tbl_conversas (
    id_conversas INT PRIMARY KEY,
    jogador1 VARCHAR(100),
    jogador2 VARCHAR(100),
    data_envio DATE
);

CREATE TABLE tbl_avaliacoes (
    id_avaliacoes INT PRIMARY KEY,
    data_avaliacao DATE,
    nota VARCHAR(45)
);

CREATE TABLE tbl_forma_pagamento (
    id_forma_pagamento INT PRIMARY KEY,
    dinheiro VARCHAR(1000),
    cartao VARCHAR(2),
    taxa_maquininha DECIMAL(5,2),
    pix VARCHAR(45)
);



show tables;
desc tbl_jogo;
select * from tbl_jogo;