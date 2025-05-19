var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8090 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});



// list all modules
app.get("/modules", (req, res, next) => {
    console.log("SELECT module.");
    let sql = `SELECT name, code, mark FROM module ORDER BY name`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single module by name
app.get("/modules/:name", (req, res, next) => {
    var sql = "select * from module where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new module
app.post("/module/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("Name for module not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        code: req.body.code,
        mark: req.body.mark
    }
    var sql ='INSERT INTO module (name, code, mark) VALUES (?,?,?)'
    var params =[data.name, data.code, data.mark]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// update module
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updateModule/:name", (req, res, next) => {
    console.log("UPDATE Module:" + req.params.name);
    var data = {
        name: req.body.name,
        code: req.body.code,
        mark: req.body.mark
    }
    console.log("UPDATE Module: data.name = " + data.name);
    db.run(
        `UPDATE module set 
           name = COALESCE(?,name), 
           code = COALESCE(?,code),
           mark = COALESCE(?,mark)  
             WHERE name = ?`,
        [data.name, data.code, data.mark, req.params.name],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// delete
app.delete("/deleteModule/:name", (req, res, next) => {

    console.log("DELETE Module:" + req.params.name);

    db.run(
        'DELETE FROM module WHERE name = ?',
        req.params.name,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})



// Default response for any other request
app.use(function(req, res){
    res.status(404);
});