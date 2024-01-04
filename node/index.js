const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db', //nao encontrou o host db. tive que colocar o ip do container -> 'docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db'
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.get('/', (req, res) => {
    gravarNome();

    let mysql = require('mysql');
    let connection = mysql.createConnection(config);

    let people = '';
    connection.query('SELECT * FROM people', (error, results, fields) => {
        connection.end()
        
        if (error) throw error;

        people = results.map(result => result.name).join(', ');
        res.send(`<h1>Full Cycle Rocks!</h1><p>Names: ${people}</p>`);
      });
    
    
    console.log('Nome encontrados no banco de dados : ', people);
    
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

function nomeAleatorio(){
    let faker = require('faker');    
    
    let names = Array.from({ length: 25 }, () => faker.name.firstName());
    let indiceAleatorio = Math.floor(Math.random() * names.length);
   
    console.log('Indice aleatorio:', indiceAleatorio);
    console.log('Nomes aleatorios: ', names);
    console.log('Nome escolhido: ', names[indiceAleatorio]);
    
    return names[indiceAleatorio];
}
