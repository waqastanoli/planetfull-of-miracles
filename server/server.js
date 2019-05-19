import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import webpackDevMiddleWare from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import fs from 'fs';
import webpackConfig from '../webpack.config.babel';
var validator = require('express-validator');
 var https = require('https');
// cors settings
const app = express();
app.use(cors());
app.use(validator())
const indexPath = path.join(__dirname, '../dist', 'index.html');
const compiler = webpack(webpackConfig);
app.use(express.static('./dist'));
app.use(webpackDevMiddleWare(compiler, {
  noInfo: true,
  writeToDisk: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleWare(compiler));

// adding bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// http server
//const httpServer = http.createServer(app);

// database settings
//mongoose.connect('mongodb://salman:sabir2012@ds163044.mlab.com:63044/ecommerce-store');
//mongoose.connect('mongodb://techstore-user:wholesale@127.0.0.1:27017/ecommerce-store');
var connection_string = "mongodb+srv://planetful_dbuser:waqas86reconfirm!@cluster0-isszx.mongodb.net/planetful?retryWrites=true";
mongoose.connect(connection_string, {
  useCreateIndex: true,
  useNewUrlParser: true
});

/*mongoose.connect('mongodb://localhost:27017/planetful', {
  useCreateIndex: true,
  useNewUrlParser: true
});*/

var db = mongoose.connection;

// connection test
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database connected..')
})

// for static files
app.use(express.static(__dirname + '/uploads'));

// get files
app.get("/uploads/:img", (req, res) => {
  console.log(req.params.img);
  res.sendFile(path.join(__dirname, "./uploads/" + req.params.img));
});

// routing
routing();

import productRoutes from './routes/product_routes';
import orderRoutes from './routes/order_routes';
import userRoutes from './routes/user_routes';
import topicRoutes from './routes/topic_routes';
import verification_routes from './routes/verification_routes';
function routing() {
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/topic', topicRoutes);
  //app.use('/verification', verification_routes);
}

app.get('*', (_, res) => { res.sendFile(indexPath); });

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(`🚀 Server ready at 8080`)
)
/*var options = {

 key: fs.readFileSync('./../wholesaletech.store.key'),

 cert: fs.readFileSync('./../52efd1d3da1871ea.crt'),

 ca: fs.readFileSync ('./../gd_bundle-g2-g1.crt')

};
https.createServer(options, app).listen(443,"0.0.0.0");*/