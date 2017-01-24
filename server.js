import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import express from 'express';

const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error =>{
      console.error(error);
      res.status(404).send('Bad Request'); 
    });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
/**
import config from './config';


import express from 'express';
const server = express(); 

server.get('/', (req, res) => 
	{ res.send ('Hello express')
}); 
server.get('/about.html', (req, res) => 
	{ res.send ('The about page');
}); 


server.listen(config.part, () => {
	console.info('Express listening on port ', config.part);
}); 
*/