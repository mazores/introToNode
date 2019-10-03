const express = require('express');

// after npm i- s hbs import 
const hbs = require('hbs');
const path = require('path');
//

const sql = require('./utils/sql');

const port = process.env.PORT || 5050;

const app = express();

// after npm i -s hbs import
app.use(express.static('public')); // telling our app to use public directory

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + "/views"));
//

// / means main 
app.get('/', (req, res) => {
  res.render('home', { homemessage: "hey there!", bio: "some generic info"}); // based on home.hbs
})

app.get('/users', (req, res) => {
  //get user data when we hit this route

  //try connection
  //if connection fails log error to console and quit
  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let query = "SELECT * FROM tbl_card";

    sql.query(query, (err, rows) => { 
      // we're dpone with our B connection so let someone else use it
      connection.release();

      // if something broke, quit and show an error message
      if (err) { return console.log(err.message); }

      //show me data!
      console.log(rows);

      //res.render('user', rows[0]);
    })
  })
})


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})