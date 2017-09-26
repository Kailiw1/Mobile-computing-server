var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
    userName: 'daryl',
    password: 'Helloccc9090',
    server: 'daryldaryl.database.windows.net',
    options: {
        database: 'mobile_db',
        encrypt: true
        // rowCollectionOnRequestCompletion: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err)
    }
});


function Query() {

    this.queryUsers = function (params, callback) {
        console.log('Reading rows from the Table...');
        var tmp = []
        // Read all rows from table
        request = new Request(
            "select * from Users",
            // "update Users set email = 'liboao1122@hotmail.com' where uid=1",
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                callback(tmp)
                // process.exit();
            }
        );

        request.on('row', function (columns) {
            // callback(columns)

            var row = {}
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
            tmp.push(row)
        });

        connection.execSql(request);

    }
    this.login = function (params, callback) {
        console.log('Reading rows from the Table...');
        var tmp = []
        // Read all rows from table
        request = new Request(
            "select * from Users where username ='" + params.username +
            "' and password = '" + params.password + "'",
            // "update Users set email = 'liboao1122@hotmail.com' where uid=1",
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                callback(tmp)
                // process.exit();
            }
        );

        request.on('row', function (columns) {
            // callback(columns)

            var row = {}
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
            tmp.push(row)
        });
        connection.execSql(request);

    }
}

module.exports = Query