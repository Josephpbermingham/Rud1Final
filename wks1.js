let express = require('express');
let Pool = require('pg').Pool;
let bodyParser = require('body-parser');
//todo load values into output array format output as pretty pretty json
const path = require('path');
const app = express();

var config = {
host: 'localhost',
      user: 'joseph',
      password: '1419600',
      database: 'classmem'
};

var pool = new Pool(config);

app.set('port', (8080));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: 'true'}));
app.get('/api', async (req, res) => {
                var Classes = req.query.workshop;
                var add = req.query.add;
                if(req.query.workshop){
                try{
                    var response = await pool.query('SELECT * FROM students WHERE workshop =$1',[Classes]);
                    var clear = response.rows.map(function(item){return(item.name);})
                    if(response.rowCount==0)  {
                        res.json({error:'workshop not found'});
                    }
                    console.log(response.rowCount+" clear.rowcount");
                      res.json({'attendees' : clear});
                    
                }catch(err){
                console.error("ERROR running query " +err);
                }}
                else{
                try{
                const response = await pool.query('SELECT DISTINCT workshop FROM students');
                if(response.rowCount==0){
                    res.json({status:'workshop not found'});
                }
                var clear = response.rows.map(function(item){return(item.workshop);})
                console.log(res.json({'workshops': clear}));
                res.json({'Workshops': clear});}
                catch(err){
                console.error("ERROR running query " + err);
                }}});

app.post('/api', async (req, res) => {

                console.log(req.body);

                var student = req.body.attendee;
                var workshop = req.body.workshop;

                if(!student || !workshop){
                        res.json({error:'papameters not given'});
                        console.log("param error");
                }
                else{
                        try{
                        var check = await pool.query('select * FROM students where name = $1 and workshop = $2',[student, workshop]);
                        var refcheck =check.rows.map(function(item){return (item.name);})

console.log("THis si check");
console.log(check.rowCount);
if(check.rowCount==0){
                var response = await pool.query('INSERT INTO students values ($1,$2)',[student, workshop]);
                    var output= await pool.query('select * from students where name = $1 and workshop = $2',[student,workshop]);
                    var attendee = 
                    res.json({'attendee':student,'workshop':workshop});
                }
                else{res.json({error:'attendee already enrolled' });
                }
                }catch(e){
                console.error("ERROR RUNNING Insert " + e);
                }}});

app.listen(app.get('port'), () => {
                console.log('Program Running');
                });