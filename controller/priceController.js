const axios = require('axios');

exports.priceConversion = async(req,res) => {
    try{
        const { fromCurrency, toCurrency, date } = req.body;

        // Get historical prices for both cryptocurrencies on the specified date
        const fromCurrencyData = await getCryptoHistoricalData(fromCurrency, date);
        const toCurrencyData = await getCryptoHistoricalData(toCurrency, date);

        console.log(fromCurrency);
        console.log(toCurrency);

        // Extract prices from the data
        const fromCurrencyPrice = fromCurrencyData.market_data.current_price.usd;
        const toCurrencyPrice = toCurrencyData.market_data.current_price.usd;

        // Calculate the conversion price
        const conversionPrice = fromCurrencyPrice / toCurrencyPrice;

        res.status(200).json({
            success : true,
            price: conversionPrice,
            message : 'Conversion Successful' 
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Internal Error"
        })
    }
}

const getCryptoHistoricalData = async (cryptoId, date) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/history`, {
        params: {
          date: date,
          localization: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error.message);
      throw error;
    }
};
