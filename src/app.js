import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import colors from 'colors';
import exphbs from 'express-handlebars';
import flash from 'connect-flash';

import mainRoute from '../routes/mainRoute';

const PORT = process.env.PORT | 9010;
const app = express();

// setup morgan logger
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// setup static folder
app.use(express.static(path.join(__dirname, '/../public')));

// View Engine.
app.set('views', path.join(__dirname, '/../public/views'));
app.engine('handlebars', exphbs({defaultLayout: 'main.handlebars', layoutsDir: __dirname + '/../public/views/layouts'}));
app.set('view engine', 'handlebars');

// use connect-flash
app.use(flash());

app.use('/', mainRoute);

app.get('*', function (req, res, next) {
  res.send('<div style="text-align: center; margin-top: 30px;"><h2>SORRY NO SUCH URL EXISTS!!!</h2><h2 style="color: grey;">404 NOT FOUND</h2></div>');
}); 

app.listen(PORT, () => {
  console.log(colors.cyan(`app started @ ${PORT}`));  // eslint-disable-line no-console
});