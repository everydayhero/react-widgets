var express     = require('express')
var app         = express();
var compression = require('compression');
var morgan      = require('morgan');

var staticPath  = __dirname + '/public/';
var port        = Number(5000);

app.use(morgan());
app.use(compression());

function sendStaticFile(name) {
  return function (_, res) {
    res.sendfile(staticPath + name);
  };
}

app.use(express.static(staticPath));
app.get('/', sendStaticFile('index.html'));
app.get('*', sendStaticFile('index.html'));

app.listen(port, console.log.bind(this, 'Port: ' + port));
