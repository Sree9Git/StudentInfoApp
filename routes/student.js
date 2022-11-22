const { query } = require("express");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");


/* GET users listing. */
/* http://localhost:2020/std/std-reg?name="Sree"&loc="Hyderabad" */ 
/* Output : Hello i am "Sree" from "Hyderabad" */ 
router.get("/std-reg", (req, res, next) => {
  const { name, loc } = req.query;
  var output = `Hello i am  ${name} from ${loc} `;
  res.send(output);
});


//POST
router.post("/reg-std", (req, res, next) => {
  let conn = mysql.createConnection({
    host: "192.168.1.26",
    port: 3306,
    user: "root",
    password: "sree",
    database: "nodedb",
  });

  const { name, uid, pwd, gender, hobbies, country, address } = req.body;

  console.log(
    "**** " + name + uid + pwd + gender + hobbies + country + address
  );

  conn.connect((err, succ) => {
    if (err) {
      res.send("Data Not inserted Error: " + err);
    } else {
      let q = `insert into student(name, uid, pwd, gender, hobbies, country, address)  values( '${name}', '${uid}', '${pwd}', '${gender}','${hobbies}','${country}', '${address}')`;

      console.log("query : " + q);

      conn.query(q, (err, succ) => {
        if (err) {
          res.send(err);
        } else {
          res.send(succ);
        }
      });

     // res.send("Data Inserted Successfully : " + succ + "   Query: " + query);
    }
  });

  //res.send(`POST reg-std is called... ${name} ${loc} `);
});

module.exports = router;
