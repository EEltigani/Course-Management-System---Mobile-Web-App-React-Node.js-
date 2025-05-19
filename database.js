var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('mymodules.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the mymodules database.');
  });


  // create table 'book'
  const sql='CREATE TABLE module(name text, code text, mark text)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Table already created.');
    }else{
      console.log('Table created.');
      
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'INSERT INTO module(name, code, mark) VALUES(?,?,?)';
      db.run(insert, ['JavaScript Programming', 'code1','John Wiley']);
      db.run(insert, ['React with Hooks', 'G Lim', 'Some mark']);
    }
  });


// export as module, called db
module.exports = db