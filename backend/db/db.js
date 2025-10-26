// db.js
import sqlite3 from "sqlite3"

// Open or create a database file
const db = new sqlite3.Database('example.db');

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS application (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  next_application_number INTEGER

)`);


const update_application_number = async(applicationNumber) => {
    try{
        let table_rows = [];
        db.all(`SELECT * FROM application`, [], (err, rows) => {
        if (err) throw err;
        table_rows = rows;
        if(table_rows.length == 0){
            db.run(`INSERT INTO application (next_application_number) VALUES (?)`, [applicationNumber], function (err) {
            if (err) return console.error(err.message);
            console.log(`Updated Application ID: ${this.lastID}`);
            });
        }else{
            db.run(
                `UPDATE application SET next_application_number = ? WHERE id = 1`,
                [applicationNumber],
                function (err) {
                    if (err) return console.error(err.message);
                    console.log(`Updated Application ID: ${this.changes}`);
                }
            );
        };
    });

    }catch(error){
        console.log(error.message);
    };
};


const get_next_application_number = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT next_application_number FROM application WHERE id = 1`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]?.next_application_number);
      }
    });
  });
};

export {db, update_application_number, get_next_application_number};

