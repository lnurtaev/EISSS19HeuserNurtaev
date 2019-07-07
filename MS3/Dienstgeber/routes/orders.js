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

/* GET - orders. */
router.get('/', function(req, res, next) {
    let orderobj = {};
    connection.query("Select * from orders", function (error, results, fields) {
        orderobj.orders = [];
        if (results.length === 0) {
            res.status(404).json({"orders": "Keine Bestellungen vorhanden"});
        } else if (error) {
            res.status(500).json({"orders": "Error"});
        } else {
            for (let i = 0; i <= results.length - 1; i++) {
                orderobj.orders .push(results[i]);
            }
            res.status(200).json(orderobj);
            console.log(orderobj);
        }
        next();
        res.end();
    });
});

/* POST - orders. */
router.post('/', function(req, res, next) {
    let userID = 0;
    if (req.body.userID !== undefined) {
        userID = req.body.userID;
    }
    let productID = 0;
    if (req.body.productID !== undefined) {
        productID = req.body.productID;
    }
    let menge = 0;
    if (req.body.menge !== undefined) {
        menge = req.body.menge;
    }
    let einzel_preis = 0;
    if (req.body.einzel_preis !== undefined) {
        einzel_preis = req.body.einzel_preis;
    }
    let total_preis = 0;
    if (req.body.total_preis !== undefined) {
        total_preis = req.body.total_preis;
    }
    let status = 0;
    if (req.body.status !== undefined) {
        status = req.body.status;
    }
    let einheit = 0;
    if (req.body.einheit !== undefined) {
        einheit = req.body.einheit;
    }
    connection.query("Insert into orders values ('','" + userID + "','" + productID + "','" + menge + "','" + einzel_preis + "','" + total_preis + "','" + status + "','" + einheit + "')", function (error, results, fields) {
        if (error) {
            res.status(404).json({"orders": "Konnte Bestellung nicht anlegen"});
            next();
            res.end();
        } else {
            connection.query("SELECT LAST_INSERT_ID() as orderID", function (error, results, fields) {
                res.status(200).json(results);
                next();
                res.end();
            });
        }
    });
});

/* PUT - orders. */
router.put('/:orderID', function (req, res, next) {
    let orderID = req.params.orderID;
    orderID = orderID.replace(":", "");
    let userID = req.body.menge;
    let productID = req.body.einheit;
    let menge = req.body.typeID;
    let einzel_preis = req.body.einheit;
    let total_preis = req.body.typeID;
    let status = req.body.einheit;
    let einheit = req.body.typeID;
    if (userID !== undefined) {
        connection.query("update orders set userID='" + userID + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (productID !== undefined) {
        connection.query("update orders set productID='" + productID + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (menge !== undefined) {
        connection.query("update orders set menge='" + menge + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (einzel_preis !== undefined) {
        connection.query("update orders set einzel_preis='" + einzel_preis + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (total_preis !== undefined) {
        connection.query("update orders set total_preis='" + total_preis + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (status !== undefined) {
        connection.query("update orders set status='" + status + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    if (einheit !== undefined) {
        connection.query("update orders set einheit='" + einheit + "'  where orderID='" + orderID + "'", function (error, results, fields) {
        });
    }
    res.status(200).write("Änderung abgeschlossen.");
    next();
    res.end();
});

/* DELETE - orders. */
router.delete('/:orderID', function (req, res, next) {
    let orderID = req.params.orderID;
    orderID = orderID.replace(":", "");
    connection.query("delete from orders where orderID ='" + orderID + "'", function (error, results, fields) {
        if (error) {
            res.status(500).write("Interner Fehler");
        } else {
            res.status(200).write("Löschen von orderID: " + orderID + " erfolgreich.");
        }
        next();
        res.end();
    });
});

module.exports = router;