-- Criando BD
CREATE DATABASE sails_app;

-- Criando Usuário a ser utilizado pelo Sails
CREATE USER sails_app WITH PASSWORD 'password';
ALTER ROLE sails_app SET client_encoding TO 'utf8';
ALTER ROLE sails_app SET default_transaction_isolation TO 'read committed';
ALTER ROLE sails_app SET timezone TO 'America/Sao_Paulo';
SET TIMEZONE TO 'America/Sao_Paulo';

-- Concedendo privilégios ao usuário do Sails
GRANT ALL PRIVILEGES ON DATABASE sails_app TO sails_app;
