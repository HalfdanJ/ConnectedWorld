var pcap = require("pcap"),
  pcap_session = pcap.createSession("", "tcp");

var RateLimiter = require('limiter').RateLimiter;
var geoip = require('geoip-lite');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var cache = {};

//Web host
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


//Socket.io
io.on('connection', function(socket){
  console.log('a browser connected');
});


//Lookup local IP
var localip;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Local ip address: '+add);
  localip = add;
});


//Listen for packages
console.log("Listening on " + pcap_session.device_name);
pcap_session.on('packet', function (raw_packet) {
  var packet = pcap.decode.packet(raw_packet);

  // Look for the remote IP address.
  // Can both be the daddr (destination) or saddr (source)
  var ip;
  var direction;
  if(packet.link.ip.daddr != localip){
    ip = packet.link.ip.daddr;
    direction = 'sending';
  } else if(packet.link.ip.saddr != localip){
    ip = packet.link.ip.saddr;
    direction = 'receiving';
  }

  //console.log(packet.link.ip.total_length)
  //If a remote IP was found
  if(ip){
    //Look in the cache
    if(cache[ip]){
      //Call the limiter so we don't send to many requests to the browser
      if(cache[ip].limiter.tryRemoveTokens(1)){
        cache[ip].size = packet.link.ip.total_length;
        io.emit('packet', cache[ip]);
      }


    } else {

      (function(_ip){
        console.log("New destination: "+_ip);

        //Look up the geo location of the IP
        var geo = geoip.lookup(_ip);
        //  cache[ip] = 'resolving';
        //  require('dns').reverse(_ip,function(err, domains){
        //  console.log(domains);

        var limiter = new RateLimiter(1, 1000);

        cache[ip] = {ip:_ip, geo: geo, /*domains:domains,*/ limiter: limiter, size: packet.link.ip.total_length};

        //Emit the packet to the browser
        io.emit('packet', cache[ip]);
        //  })

      })(ip);

    }
  }
});