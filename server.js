var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const jsonfile = require('jsonfile')
var oxford = require('project-oxford'),
    client = new oxford.Client('38b88077298b4dc59d87682f324e1adc');
var NodeWebcam = require("node-webcam");
var Linq = require('linq');
var prompt = require('prompt');
var fs = require('fs');
var request = require('request');

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/forecast', function (req, res) {

    const secret_key = 'dcb4eb4795a963c13544021a5799fe28';
    const base = 'https://api.darksky.net/forecast';
    const lat = req.query.lat;
    const lon = req.query.lon;

    return request(base + '/' + secret_key + '/' + lat + ',' + lon, function(error, response, body) {
        return response;
    });
});



var file = './public/Data/users.json';
//var users = [{ id: 1, username: 'Naval', guids: ['a38ae7e1-8059-4724-b84e-312ff891d66d'], images: ['./Data/Naval.JPG'] }, { id: 2, username: "Gareth", guids: ['77dae8bf-64d3-445e-bd14-d45cb191dc39'] }];
//jsonfile.writeFile(file, users, function (err) {
//    console.error(err)
//})
var users = jsonfile.readFileSync(file);

// users.forEach(function(user)
// {
//     var timeOuts = 'timeOuts';
//     if (!timeOuts in user)
//     {

//     }
// });


var opts =
{
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "buffer",
    verbose: false
};
//Creates webcam instance
var Webcam = NodeWebcam.create(opts);

takePicture();
setInterval(takePicture, 20000);


http.listen(3000, function ()
{
  console.log('listening on *:3000');
});

function takePicture()
{
    Webcam.capture("./public/Data/tmp.JPG", function (err, data) {
        (client.face.detect(
        {
            path: './public/Data/tmp.JPG',
            returnFaceId: true,
            analyzesAge: true,
            analyzesGender: true
        }).then(function (response) {
            console.log(response);
            if (response.length > 0) {
                var faceId = response[0].faceId;
                //console.log('The age is: ' + response[0].attributes.age);
                //console.log('The gender is: ' + response[0].attributes.gender);
                //console.log(Linq.from(users).select(function (x) { console.log(x.guid); return x.guid }).toArray());
                client.face.similar(faceId,
                {
                    candidateFaces: Linq.from(users).select(function (x) { return x.guids }).selectMany(function (x) { return x }).toArray()
                }).then(function (response) {
                    console.log(response);
                    if (response.length > 0 && response[0].confidence > .6) {
                        var user = Linq.from(users).where(function (x) { return Linq.from(x.guids).contains(response[0].faceId) }).first();
                        console.log("User verified as " + user.username + ".");
                        io.sockets.emit('userVerified', user)
                        if (user.guids.length < 11 && response[0].confidence > .8) {
                            user.guids.push(faceId);
                            jsonfile.writeFile(file, users, function (err) {
                                console.error(err)
                            })
                            var filename = './public/Data/' + user.username + user.guids.length + '.JPG';
                            fs.rename('./public/Data/tmp.JPG', filename, function (err) {
                                if (err) console.log('ERROR: ' + err);
                            });
                            user.images.push(filename);
                        }
                    }
                    else {
                        console.log("User not recognised");
                        //prompt.start();
                        //prompt.get([{ name: 'username', message: "Please enter new user name" }], function (err, result) {
                        //    users.push({ id: users[users.length - 1].id + 1, username: result.name, guids: [faceId] });
                        //});
                        //jsonfile.writeFile(file, users, function (err) {
                        //    console.error(err)
                        //})

                    }
                }).catch((rejected) => {
                    console.log('rej: ' + rejected);
                });
            }
        }));

    });
}


