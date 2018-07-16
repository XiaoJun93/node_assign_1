//primary file for api

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//initiate server
var server = http.createServer(function(req,res){
  dataHandler(req,res);
});

//start server
server.listen(3002,function(){
  console.log("server started, listening on port 3002");
});

//get url and decode data
var dataHandler = function(req,res){
  var parseUrl = url.parse(req.url,true);

  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  //get query string as an queryString
  var queryStringObject = parseUrl.query;

  //convert all reqeust http method to lowwer case
  var method = req.method.toLowerCase();

  //get header as an object
  var headers = req.headers;

  //get payloads if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();


  //define data
  var data = {
    'trimmedPath':trimmedPath,
    'queryStringObject':queryStringObject,
    'method':method,
    'headers':headers,
    'payload':buffer
  };

  //choose handlers
  var choosehandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath]: handlers.notfound;

  //handler and send response
  choosehandler(data,function(statusCode,payload){
    statusCode = typeof(statusCode)=="number"?statusCode:200;

    payload = typeof(payload)=='object'?payload:{};

    var payloadString = JSON.stringify(payload);

    //response message
    res.setHeader('Content-type','application/json');
    res.writeHead(statusCode);
    res.end(payloadString);

    console.log(data);

  });
});


  //log the request pathname
  console.log('reqeust received with this path: ', trimmedPath);
};

//router
//define handlers
var handlers = {};

//handler for path hello
handlers.hello = function(data,callback){
  callback(200,{"status":"success",
                "message":"Welcome to my first node.js assignment."});
};

//not found handlers
handlers.notfound = function(data,callback){
  callback(404,{"status":"page not found","message":'The page you looking are not found'});
};

//define request router
var router = {
  'hello': handlers.hello
};
