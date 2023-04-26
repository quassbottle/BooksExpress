const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

const host = '127.0.0.1';
const port = process.env.PORT || 5000;

app.engine('handlebars', handlebars.engine({
   defaultLayout: 'main',
   layoutsDir: './view/layouts'
}));

app.set('views', './view');
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

const home = (req, res) => {
   res.render('index', {
      text: 'Hello, world!'
   });
}
const error = (req, res, errorCode) => {
   res.status(errorCode);
   res.render('error', {
      errorCode: errorCode,
      layout: false
   });
}

app.get('', (req, res) => {
   home(req, res);
});

app.get('/home', (req, res) => {
   home(req, res);
});

app.get('/register', (req, res) => {
   res.render('register');
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.use((req, res, next) => {
   error(req, res, 404);
});

app.listen(port, host, () => {
   console.log(`Server started ${host}:${port}`);
});