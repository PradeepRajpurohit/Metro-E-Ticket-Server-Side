const mongoose = require('mongoose');
const {Schema} = mongoose;

const PrevTicketSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    from:{
        type : String,
        require: true
    },
    to:{
        type : String,
        require: true
    },
    fare:{
        type : String,
        require: true
    },
    date:{
        type : Date,
        default: Date.now
    }
});
const PrevTicket = mongoose.model('PrevTicket',PrevTicketSchema);
// User.createInde xes();

module.exports = PrevTicket;