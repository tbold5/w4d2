const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const input = process.argv[2]
let query = `SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE '${input}'`;

function printResult(resultRow){
    resultRow.forEach(function(item, i) {
        console.log(`-${(i+1)}: ${item.first_name} ${item.last_name}, born '${item.birthdate.toISOString().split('T')[0]}'`)
    });
        
};
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...')
    console.log(`Found ${result.rows.length} person(s) by the name ${input}`)
    printResult(result.rows) 
    client.end();
  });
});