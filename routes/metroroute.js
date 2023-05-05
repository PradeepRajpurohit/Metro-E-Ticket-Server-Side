const express = require('express')
const red = require('../lines/red.json')

const router = express.Router();

//Logic to fetch route
const fetchRoute = (from,to)=>{
    let middlestation = [];
    let s;
    let d;
    let diff;
    let fare;
    for(let i = 0;i<red.length;i++){
        if(red[i].sname===from){
            s = i;
        }
        if(red[i].sname===to){
            d = i;
        }
    }
    if(s<d){
        let j = 0;
        for(let i = s;i<d;i++){
            middlestation[j]=red[i].sname+" > ";
            j++;
        }
        middlestation[j] = red[d].sname;
        diff = d-s;
    }
    else{
        let j =0;
        for(let i = s;i>d;i--){
            middlestation[j]=red[i].sname+" > ";
            j++;
        }
        middlestation[j] = red[d].sname;
        diff = s-d;
    }
    if(diff<=2){
        fare = 10;
    }
    else if(diff>2 && diff<=5){
        fare = 20
    }
    else if(diff>5 && diff<=10){
        fare = 30
    }
    else if(diff>10 && diff<=18){
        fare = 40
    }
    else if(diff>18 && diff<=25){
        fare = 50
    }
    else{
        fare = 60
    }
    const result = {
        middlestations : middlestation,
        origin:from,
        destination:to,
        fare:fare,
        way:"2",
    }
    return result;

}

// Server code to get route
router.post('/getroute',(req,res)=>{
    const {from,to} = req.body;
    const result = fetchRoute(from,to);
    res.json(result);
})

module.exports = router;