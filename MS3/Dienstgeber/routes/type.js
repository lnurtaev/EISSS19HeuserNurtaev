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

/* GET - type. */
router.get('/', function(req, res, next) {
    let typeobj = {};
    connection.query("Select * from type", function (error, results, fields) {
        typeobj.type = [];
        if (results.length === 0) {
            res.status(404).json({"type": "Keine Arten vorhanden"});
        } else if (error) {
            res.status(500).json({"type": "Error"});
        } else {
            for (let i = 0; i <= results.length - 1; i++) {
                typeobj.type .push(results[i]);
            }
            res.status(200).json(typeobj);
            console.log(typeobj);
        }
        next();
        res.end();
    });
});

/* POST - type. */
router.post('/', function(req, res, next) {
    let name = 0;
    if (req.body.name !== undefined) {
        name = req.body.name;
    }
    let art = 0;
    if (req.body.art !== undefined) {
        art = req.body.art;
    }
    let reifedauer = 0;
    if (req.body.reifedauer !== undefined) {
        reifedauer = req.body.reifedauer;
    }
    let avg_import_co2_wert = 0;
    if (req.body.avg_import_co2_wert !== undefined) {
        avg_import_co2_wert = req.body.avg_import_co2_wert;
    }
    let lokal_co2_wert = 0;
    if (req.body.lokal_co2_wert !== undefined) {
        lokal_co2_wert = req.body.lokal_co2_wert;
    }
    connection.query("Insert into type values ('','" + name + "','" + art + "','" + reifedauer + "','" + avg_import_co2_wert + "','" + lokal_co2_wert + "')", function (error, results, fields) {
        if (error) {
            res.status(404).json({"type": "Konnte Art nicht anlegen"});
            next();
            res.end();
        } else {
            connection.query("SELECT LAST_INSERT_ID() as typeID", function (error, results, fields) {
                res.status(200).json(results);
                next();
                res.end();
            });
        }
    });
});

/* PUT - type. */
router.put('/:typeID', function (req, res, next) {
    let typeID = req.params.typeID;
    typeID = typeID.replace(":", "");
    let name = req.body.name;
    let art = req.body.art;
    let reifedauer = req.body.reifedauer;
    let avg_import_co2_wert = req.body.avg_import_co2_wert;
    let lokal_co2_wert = req.body.lokal_co2_wert;
    if (name !== undefined) {
        connection.query("update type set name='" + name + "'  where typeID='" + typeID + "'", function (error, results, fields) {
        });
    }
    if (art !== undefined) {
        connection.query("update type set art='" + art + "'  where typeID='" + typeID + "'", function (error, results, fields) {
        });
    }
    if (reifedauer !== undefined) {
        connection.query("update type set reifedauer='" + reifedauer + "'  where typeID='" + typeID + "'", function (error, results, fields) {
        });
    }
    if (avg_import_co2_wert !== undefined) {
        connection.query("update type set avg_import_co2_wert='" + avg_import_co2_wert + "'  where typeID='" + typeID + "'", function (error, results, fields) {
        });
    }
    if (lokal_co2_wert !== undefined) {
        connection.query("update type set lokal_co2_wert='" + lokal_co2_wert + "'  where typeID='" + typeID + "'", function (error, results, fields) {
        });
    }
    res.status(200).write("Änderung abgeschlossen.");
    next();
    res.end();
});

/* DELETE - type. */
router.delete('/:typeID', function (req, res, next) {
    let typeID = req.params.typeID;
    typeID = typeID.replace(":", "");
    connection.query("delete from type where typeID ='" + typeID + "'", function (error, results, fields) {
        if (error) {
            res.status(500).write("Interner Fehler");
        } else {
            res.status(200).write("Löschen von typeID: " + typeID + " erfolgreich.");
        }
        next();
        res.end();
    });
});

module.exports = router;