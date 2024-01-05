# desafio-nodejs-nginx-mysql
Usuário acessa o nginx, o mesmo fará uma chamada a aplicação node.js. Onde sera retornando do banco de dados a lista dos nomes cadastrados!

# Acessando o projeto principal
cd desafio-nodejs-nginx-mysql

# Baixar imagens docker-hub
docker pull jazon/fullcycle:desafio-node-js-nginx-mysql_nginx

Baixar node js docker pull jazon/fullcycle:desafio-node-js-nginx-mysql_app

# Executar o projeto 
docker-compose up --build -d

docker-compose ps

docker-compose down

# Configurar Banco de dados 
docker exec -it db bash

mysql -uroot -p
senha root

show databases;

use nodedb;

create table people (id int not null auto_increment, name varchar(255), primary key(id));

exit 

exit

# Configurar nodejs 
cd node;

npm install;

cd ..

# Inserindo Registros na tabela
http://localhost:8080

# Removendo todos os Registros da tabela
http://localhost:8080/limparBaseDados