import app from './app';
import '../server/controllers/home-controller';

const port = process.env.PORT || 8080;

app.listen(port);

console.log('App listening on port ' + port);
