const mongoose = require('mongoose');
const {Schema} = mongoose;

const TicketSchema = new Schema({
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
    way:{
        type : String,
        require: true
    },
    date:{
        type : Date,
        default: Date.now
    }
});
const Ticket = mongoose.model('Ticket',TicketSchema);
// User.createInde xes();

module.exports = Ticket;