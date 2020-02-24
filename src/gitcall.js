const chalk = require('chalk');
const log = console.log;
const https = require('https');

var options = {
    host:'api.github.com',
    path: '/users/graphicaction',
    method: 'GET',
    headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
};

var request = https.request(options, function(response){
    var body = '';
    response.on('data',function(chunk){
        body+=chunk;
    });
    response.on('end',function(){
        var json = JSON.parse(body);
        console.log('the repos are  '+ JSON.stringify(json));
    });
});

request.on('error', function(e) {
console.error('and the error is '+e);
});
request.end();



