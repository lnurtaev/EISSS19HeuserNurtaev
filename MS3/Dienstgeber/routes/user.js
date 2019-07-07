var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sys'
});
connection.connect();

/* GET - user. */
router.get('/', function(req, res, next) {
  let userobj = {};
  connection.query("Select * from user", function (error, results, fields) {
    userobj.user = [];
    if (results.length === 0) {
      res.status(404).json({"user": "Keine Benutzer vorhanden"});
    } else if (error) {
      res.status(500).json({"user": "Error"});
    } else {
      for (let i = 0; i <= results.length - 1; i++) {
        userobj.user.push(results[i]);
      }
      res.status(200).json(userobj);
      console.log(userobj);
    }
    next();
    res.end();
  });
});

/* POST - user. */
router.post('/', function(req, res, next) {
  let nachname = {};
  if (req.body.nachname !== undefined) {
    nachname = req.body.nachname;
  }
  let vorname = 0;
  if (req.body.vorname !== undefined) {
    vorname = req.body.vorname;
  }
  let email = 0;
  if (req.body.email !== undefined) {
    email = req.body.email;
  }
  let alter = 0;
  if (req.body.alter !== undefined) {
    alter = req.body.alter;
  }
  let status = 0;
  if (req.body.status !== undefined) {
    status = req.body.status;
  }
  let strasse = 0;
  if (req.body.strasse !== undefined) {
    strasse = req.body.strasse;
  }
  let grundstuecksnummer = 0;
  if (req.body.grundstuecksnummer !== undefined) {
    grundstuecksnummer = req.body.grundstuecksnummer;
  }
  let ort = 0;
  if (req.body.ort !== undefined) {
    ort = req.body.ort;
  }
  let plz = 0;
  if (req.body.plz !== undefined) {
    plz = req.body.plz;
  }
  connection.query("Insert into user values ('','" + nachname + "','" + vorname + "','" + email + "','" + alter + "','" + status + "','" + strasse + "','" + grundstuecksnummer + "','" + ort + "','" + plz + "')", function (error, results, fields) {
    if (error) {
      res.status(404).json({"user": "Konnte Benutzer nicht anlegen"});
      next();
      res.end();
    } else {
      connection.query("SELECT LAST_INSERT_ID() as userID", function (error, results, fields) {
        res.status(200).json(results);
        next();
        res.end();
      });
    }
  });
});

/* PUT - user. */
router.put('/:userID', function (req, res, next) {
  let userID = req.params.userID;
  userID = userID.replace(":", "");
  let nachname = req.body.nachname;
  let vorname = req.body.vorname;
  let email = req.body.email;
  let alter = req.body.alter;
  let status = req.body.status;
  let strasse = req.body.strasse;
  let grundstuecksnummer = req.body.grundstuecksnummer;
  let ort = req.body.ort;
  let plz = req.body.plz;
  if (nachname !== undefined) {
    connection.query("update user set nachname='" + nachname + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (vorname !== undefined) {
    connection.query("update user set vorname='" + vorname + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (email !== undefined) {
    connection.query("update user set email='" + email + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (alter !== undefined) {
    connection.query("update user set alter='" + alter + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (status !== undefined) {
    connection.query("update user set status='" + status + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (strasse !== undefined) {
    connection.query("update user set strasse='" + strasse + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (grundstuecksnummer !== undefined) {
    connection.query("update user set grundstuecksnummer='" + grundstuecksnummer + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (ort !== undefined) {
    connection.query("update user set ort='" + ort + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  if (plz !== undefined) {
    connection.query("update user set plz='" + plz + "'  where userID='" + userID + "'", function (error, results, fields) {
    });
  }
  res.status(200).write("Änderung abgeschlossen.");
  next();
  res.end();
});

/* DELETE - user. */
router.delete('/:userID', function (req, res, next) {
  let userID = req.params.userID;
  userID = userID.replace(":", "");
  connection.query("delete from user where userID ='" + userID + "'", function (error, results, fields) {
    if (error) {
      res.status(500).write("Interner Fehler");
    } else {
      res.status(200).write("Löschen von userID: " + userID + " erfolgreich.");
    }
    next();
    res.end();
  });
});

module.exports = router;