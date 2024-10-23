const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors')

const app = express();


app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Insere os arquivos que contém as rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usuario.route');
const autenticacaoRouter = require('./routes/autenticacao.route');
const tiporouter= require('./routes/tipo.router');
const produtorouter= require('./routes/produto.route');
const fornecedorrouter= require('./routes/fornecedor.router');
//Insere os endpoints para cada rota
app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/autenticacao', autenticacaoRouter);
app.use('/tipo',tiporouter);
app.use('/produto',produtorouter);
app.use('/fornecedor',fornecedorrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;

