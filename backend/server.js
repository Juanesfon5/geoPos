var User = require('./models/User');
var Ruta = require('./models/Ruta');

var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
const http = require('http');
const express = require('express');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const dbHost = 'mongodb://mongo-servers:27017/geoPos';

mongoose.connect(dbHost, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


router.route('/geoPos').get((req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/geoPos/:id').get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(user);
        }
    })
});

router.route('/geoPos/routes/:id').get((req, res) => {
    Ruta.findById(req.params.id, (err, ruta) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(ruta);
        }
    })
});

router.route('/getRoutes').get((req, res) => {
    Ruta.find((err, rutas) => {
        if (err)
            console.log(err);
        else
            res.json(rutas);
    });
});

router.route('/getRoutes/addRoute').post((req, res) =>{
    
    let ruta = new Ruta(req.body);
    ruta.save().then(ruta => {
        
        res.status(200).json({'ruta': 'Added successfully'});
    })
    .catch(err => {
        
        res.status(400).send('Failed to create new ruta');
    });
})

router.route('/geoPos/add').post((req, res) => {
        let user = new User(req.body);
        user.save().then(user => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new user');
        });
    
});

router.route('/geoPos/check').post((req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    User.findOne({ 'userName' : username }, function(err, user) {
        //if (user) res.status(400).json({ success: false, msg: 'Si lo encuentra' });
        if (!user){
            //console.log("Test")
            return res.status(400).json({ success: false, msg: 'User not found' });
        }
        if (err) throw err;
        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            
            if (isMatch){
                res.status(200).json({
                    success: true
                    //token: `JWT ${jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 604800 })}`,
                });
            } else
            res.status(400).json({ success: false, msg: 'Wrong password' });
        });
    });
});

router.route('/geoPos/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            user.name = req.body.name;
            user.user = req.body.user;
            user.password = req.body.password;
            user.save().then(user => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/geoPos/delete/:id').get((req, res) => {
    User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

app.use('/', router);
server.listen(port, () => console.log(`Express server running on port:${port}`));
