var http = require('http');
var httpProxy = require('http-proxy');
// Error example
//
// Http Proxy Server with bad target
//
var proxy = httpProxy.createServer({
  target:'http://localhost:9005'
});

proxy.listen(8005);

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:5060' });
});


//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong at proxy');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

//
// Listen for the `open` event on `proxy`.
//
//proxy.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here
//  proxySocket.on('data', *function*);
//});

//
// Listen for the `close` event on `proxy`.
//
//proxy.on('close', function (req, socket, head) {
  // view disconnected websocket connections
//  console.log('Client disconnected');
//});
