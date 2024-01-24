const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db', //nao encontrou o host db. tive que colocar o ip do container -> 'docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db'
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.get('/', async (req, res) => {
    gravarNome();

    let people = await buscarNomes();
    res.send(`<h1>Full Cycle Rocks!</h1><p>Names: ${people}</p>`);   
});

// Rota para remover a lista de nomes do banco de dados
app.get('/limparNomes', async (req, res) => {
    removerNomes();    
    let people = await buscarNomes();
    res.send(`<h1>Full Cycle Rocks!</h1><p>Names: ${people}</p>`);
});
  
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
 

function gravarNome(){
    let mysql = require('mysql');
    let connection = mysql.createConnection(config)

    let nome = nomeAleatorio();
    let sql = `INSERT INTO people (name) VALUES ('${nome}')`;
    
    connection.query(sql);
    connection.end();    
}

function removerNomes(){
    let mysql = require('mysql');
    let connection = mysql.createConnection(config)

    let sql = `DELETE FROM people`;
    
    connection.query(sql);
    connection.end();    

    console.log('Dados removidos da tabela');
}

function nomeAleatorio(){
    let faker = require('faker');    
    
    let names = Array.from({ length: 25 }, () => faker.name.firstName());
    let indiceAleatorio = Math.floor(Math.random() * names.length);
   
    console.log('Indice aleatorio:', indiceAleatorio);
    console.log('Nomes aleatorios: ', names);
    console.log('Nome escolhido: ', names[indiceAleatorio]);
    
    return names[indiceAleatorio];
}

function buscarNomes() {
    return new Promise((resolve, reject) => {
        let mysql = require('mysql');
        let connection = mysql.createConnection(config);

        connection.query('SELECT * FROM people', (error, results, fields) => {
            connection.end();

            if (error) {
                console.error('Erro ao acessar o banco de dados: ', error);
                reject(error);
            } else {
                let people = results.map(result => result.name).join(', ');
                console.log('Nomes encontrados no banco de dados: ', people);
                resolve(people);
            }
        });
    });
}
