import express from 'express';
import currencyapi from '@everapi/currencyapi-js';
const client = new currencyapi('cur_live_7XsQruPVhsnPe3TqUK7IjKuNvp27tkKh9H8EWq3E')
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
const str1 = [];
app.post("/",(req,res)=>{
    const jsonData = req.body;
    const parameters = jsonData.queryResult.parameters;
    const fromcurr = parameters['currency-name'];
    const currencyName1 = jsonData.queryResult.parameters["currency-name1"];
    client.latest({
        base_currency: fromcurr,
        currencies: currencyName1
    }).then(response => {
        
        currencyName1.forEach((currency) => {
            const Obj = response.data[currency];
            var str2 = `For ${fromcurr} the equivalent ${currency} value is ${Obj.value}`;
            str1.push(str2);
        });  
    });
    const response = {
        fulfillmentText: `${str1[0]} and ${str1[1]}`
    };
    res.json(response);
});

app.listen(5000,()=>{
    console.log("server listening on port 5000")
    
})