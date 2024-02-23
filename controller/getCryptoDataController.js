const axios = require('axios');
const Coin = require('../model/coinModel');


// Function to fetch cryptocurrency data from CoinGecko API
exports.getCryptocurrencyData = async(req,res) => {
  try {
    const cryptoList = await axios.get('https://api.coingecko.com/api/v3/coins/list');

    // You can store the data
    console.log(cryptoList)
    cryptoList.data.map((crypto,index) => {
        const {id,symbol,name} = crypto;
         Coin.create({id,symbol,name});
    })

    res.status(200).json({
        success : true,
        message : 'ALL Crypto Coin Added Successfully',
    })

  } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
        res.status(500).json({
            success : false,
            message : 'Internal Error'
        })
  }
};

