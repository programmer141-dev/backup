const mongoose = require('mongoose')

const msgSchema = mongoose.Schema({
    message: {
        type: 'String',
        required: true
    }
})

const msgModel = mongoose.model('msgModel', msgSchema);
module.exports = msgModel;