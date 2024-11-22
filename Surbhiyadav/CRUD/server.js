var mysql = require("mysql2");
var http = require("http");
var url = require("url");

// Create the MySQL connection once
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "surbhi@123",
    database: "node"
});

// Connect to the MySQL database once
con.connect(function (err) {
    if (err) {
        console.log("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });

    // Parse the URL and query parameters
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;

    // Insert operation
    if (req.method === "GET" && pathname === "/insert") {
        var id = query.id;
        var name = query.name;

        if (id && name) {
            var sql = "insert into employee (id, name) values (?, ?)";
            con.query(sql, [id, name], function (err, result) {
                if (err) {
                    res.write(JSON.stringify({ message: "Query error", error: err }));
                } else {
                    res.write(JSON.stringify({ message: "Added successfully!" }));
                }
                res.end();
            });
        } else {
            res.write(JSON.stringify({ message: "Missing id or name" }));
            res.end();
        }

        // Show operation
    } else if (req.method === "GET" && pathname === "/show") {
        var query2 = "select * from employee;";
        con.query(query2, function (err, result) {
            if (err) {
                res.write(JSON.stringify({ message: "Select query error", error: err }));
            } else {
                res.write(JSON.stringify(result));
            }
            res.end();
        });

        // Delete operation
    } else if (req.method === "GET" && pathname === "/delete") {
        var idToDelete = query.id; // Expecting an id in the query string
        if (idToDelete) {
            var query2 = "delete from employee where id = ?";
            con.query(query2, [idToDelete], function (err, result) {
                if (err) {
                    res.write(JSON.stringify({ message: "Delete query error", error: err }));
                } else {
                    res.write(JSON.stringify({ message: "Deleted successfully!" }));
                }
                res.end();
            });
        } else {
            res.write(JSON.stringify({ message: "Missing id" }));
            res.end();
        }

        // Update operation
    } else if (req.method === "GET" && pathname === "/update") {
        var id = query.id;
        var newName = query.name;
        if (id && newName) {
            var query2 = "update employee set name = ? where id = ?";
            con.query(query2, [newName, id], function (err, result) {
                if (err) {
                    res.write(JSON.stringify({ message: "Update query error", error: err }));
                } else {
                    res.write(JSON.stringify({ message: "Updated successfully!" }));
                }
                res.end();
            });
        } else {
            res.write(JSON.stringify({ message: "Missing id or name" }));
            res.end();
        }
    } else {
        res.write(JSON.stringify({ message: "Invalid route" }));
        res.end();
    }
}).listen(8084, () => {
    console.log("Server is listening on 8084");
});
