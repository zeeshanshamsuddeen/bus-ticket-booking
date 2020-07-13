require('../initiateEnv');

const http = require('http');

const config = require('../config');
const app = require('../index');

const { port } = config.appDefaults;

console.log('-------- bin/www.js --------');
console.log('port: ', port);
console.log('------------------------');

app.set('port', port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log('error in listening port', err);
    return;
  }
  console.log(`Now listening on port ${port}`);
});
