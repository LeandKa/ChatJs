const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = http.createServer(app)
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const MONGODB_URI = 'mongodb+srv://leandro:root@mongodbtestes-lkwdk.mongodb.net/test?retryWrites=true&w=majority';

const store = new mongoDbStore({
  uri:MONGODB_URI,
  collection:'sessions'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret',resave:false,saveUninitialized:false,store:store}));
app.use(flash());



const indexRouter = require('./routes/indexRouter');

app.use(indexRouter);

io.on('connection', function(socket){

  socket.broadcast.emit('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message',msg);
    console.log(msg);
  });
});

app.set('view engine','ejs');
app.set('views','views');


mongoose.connect(MONGODB_URI)
.then(result =>{
  server.listen(3000,function(){
    console.log('ouvindo a porta 3000')
});
})
.catch(err =>{
  console.log(err);
})




