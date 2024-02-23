//Import Reuired Functionalities 
const express = require('express');
const app = express();
const cron = require('node-cron');
const router = require('./routes/routes');
require('dotenv').config();
const Coin = require('./model/coinModel');

//Server Port
const PORT = process.env.PORT || 8000;

//Adding Middleware
app.use(express.json());

//Mapping Route & Mount
app.use('/api/v1',router);

// Background job to update cryptocurrency list every 1 hour
cron.schedule('0 0 * * *', async () => {
    console.log('Updating cryptocurrency list...');
    try {
      // Fetch cryptocurrency list from CoinGecko API
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const cryptoList = response.data;
  
      // Clear existing data in the collection
      await Coin.deleteMany({});
  
      // Insert the fetched data into MongoDB
      await Coin.insertMany(cryptoList);
      
      console.log('Cryptocurrency list updated:', cryptoList.length, 'entries');
    } catch (error) {
      console.error('Error updating cryptocurrency list:', error.message);
    }
});

//Start Server 
app.listen(PORT,()=>{
    console.log('App Started at Port : ',PORT);
});

//Database Connection
require('./config/database').connect();