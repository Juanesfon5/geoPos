var mongoose = require('mongoose')

const Schema = mongoose.Schema;

let RutaSchema = new Schema({
    name:{
        type: String
    },
    locations: {
        type: Array
    }
}, { collection: 'rutas' });

const Ruta = module.exports = mongoose.model('Ruta', RutaSchema);
