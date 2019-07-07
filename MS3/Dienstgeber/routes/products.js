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

/* GET - products. */
router.get('/', function(req, res, next) {
    let productobj = {};
    connection.query("Select * from products", function (error, results, fields) {
        productobj.products = [];
        if (results.length === 0) {
            res.status(404).json({"products": "Keine Produkte vorhanden"});
        } else if (error) {
            res.status(500).json({"products": "Error"});
        } else {
            for (let i = 0; i <= results.length - 1; i++) {
                productobj.products .push(results[i]);
            }
            res.status(200).json(productobj);
            console.log(productobj);
        }
        next();
        res.end();
    });
});

/* POST - products. */
router.post('/', function(req, res, next) {
    let menge = 0;
    if (req.body.menge !== undefined) {
        menge = req.body.menge;
    }
    let einheit = 0;
    if (req.body.einheit !== undefined) {
        einheit = req.body.einheit;
    }
    let typeID = 0;
    if (req.body.typeID !== undefined) {
        typeID = req.body.typeID;
    }
    connection.query("Insert into products values ('','" + menge + "','" + einheit + "','" + typeID + "')", function (error, results, fields) {
        if (error) {
            res.status(404).json({"products": "Konnte Produkt nicht anlegen"});
            next();
            res.end();
        } else {
            connection.query("SELECT LAST_INSERT_ID() as productID", function (error, results, fields) {
                res.status(200).json(results);
                next();
                res.end();
            });
        }
    });
});

/* PUT - products. */
router.put('/:productID', function (req, res, next) {
    let productID = req.params.productID;
    productID = productID.replace(":", "");
    let menge = req.body.menge;
    let einheit = req.body.einheit;
    let typeID = req.body.typeID;
    if (menge !== undefined) {
        connection.query("update products set menge='" + menge + "'  where productID='" + productID + "'", function (error, results, fields) {
        });
    }
    if (einheit !== undefined) {
        connection.query("update products set einheit='" + einheit + "'  where productID='" + productID + "'", function (error, results, fields) {
        });
    }
    if (typeID !== undefined) {
        connection.query("update products set typeID='" + typeID + "'  where productID='" + productID + "'", function (error, results, fields) {
        });
    }
    res.status(200).write("Änderung abgeschlossen.");
    next();
    res.end();
});

/* DELETE - products. */
router.delete('/:productID', function (req, res, next) {
    let productID = req.params.productID;
    productID = productID.replace(":", "");
    connection.query("delete from products where productID ='" + productID + "'", function (error, results, fields) {
        if (error) {
            res.status(500).write("Interner Fehler");
        } else {
            res.status(200).write("Löschen von productID: " + productID + " erfolgreich.");
        }
        next();
        res.end();
    });
});

module.exports = router;