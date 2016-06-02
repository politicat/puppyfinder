import morgan from 'morgan';
import bodyParser from 'body-parser';

export default function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../../client'));
  app.use(express.static(__dirname + '/../../server/admin'));
  app.use(express.static(__dirname + '/../../server/db/images'));
}
