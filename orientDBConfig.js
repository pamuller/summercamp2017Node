var OrientDB = require('orientjs');

var server = OrientDB({
    host:'summercamp.org.za',
    port:2424,
    username: 'root',
    password: 'summ%rc@mp2016'
});




db = server.use('summercamp');


module.exports = db;
