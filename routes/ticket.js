const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Ticket = require('../models/Ticket')
const PrevTicket = require('../models/PrevTicket')

const router = express.Router();

//Adding current ticket POST 'http://localhost:5000/api/ticket/createticket'
router.post('/generateticket', fetchuser, async (req, res) => {
    try {
        const ticket = await Ticket.create({
            user: req.user.id,
            from: req.body.from,
            to: req.body.to,
            fare: req.body.fare,
            way:req.body.way
        })
        res.json(ticket);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }

})

//Deleting the after the journey is completd DELETE http://localhost:5000/api/ticket/deleteticket
router.delete('/deleteticket/:id', fetchuser, async (req, res) => {
    try {
        //Find the ticket to be deleted and delete it.
        let ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).send("Not Found");
        }
        if (ticket.user.toString() !== req.user.id) {
            return res.status(401).send("Ticket allowed");
        }
        ticket = await Ticket.findByIdAndDelete(req.params.id)
        res.json({ 'success': 'Ticket is deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");

    }
})


//fetchActiveTicket the active ticket http://localhost:5000/api/ticket/fetchactiveticket
router.get('/fetchactiveticket', fetchuser, async (req, res) => {
    try {
        //Find the tickets.
        let tickets = await Ticket.find({user: req.user.id});
        res.json(tickets)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})

//updatingticket the update ticket http://localhost:5000/api/ticket/updateticket
router.put('/updateticket/:id', fetchuser, async (req, res) => {
    try {
        const { way } = req.body;
        // const newTicket = { ...Ticket, [way]:way };
        // console.log(newTicket);

        //Find the note to be updated and update it.
        let ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).send("Not Found");
        }
        if (ticket.user.toString() !== req.user.id) {
            return res.status(401).send("Note allowed");
        }
        const newTicket = {
            from : ticket.from,
            to : ticket.to,
            fare : ticket.fare,
            way : req.body.way,
        };

        ticket = await Ticket.findByIdAndUpdate(req.params.id, {$set: newTicket},{new:true})
        // console.log(ticket);
        res.json({ticket});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }

})


//fetchPrevTicket the after the journey is completd GET http://localhost:5000/api/ticket/fetchprevticket
router.get('/fetchprevticket', fetchuser, async (req, res) => {
    try {
        //Find the tickets.
        let prevtickets = await PrevTicket.find({user: req.user.id});
        res.json(prevtickets)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})

//Adding after the journey is completed ticket POST 'http://localhost:5000/api/ticket/addprevticket'
router.post('/addprevticket', fetchuser, async (req, res) => {
    try {
        const prevticket = await PrevTicket.create({
            user: req.user.id,
            from: req.body.from,
            to: req.body.to,
            fare: req.body.fare
        })
        res.json(prevticket);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }

})


module.exports = router;