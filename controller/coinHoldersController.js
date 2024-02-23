const axios = require('axios');

exports.listOfCompanies = async(req,res) => {
    try{
        const {currency} = req.body;

        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
        console.log(response)
                                        

        const companyList = response.data.companies;
        console.log(companyList)

        let companyNames = [];

        companyList.map((company) => {
            companyNames.push(company.name)
        })
        console.log(companyNames)

        res.status(200).json({
            success : true,
            message : 'Company List Fetched Successfully',
            companyNames
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal Error'
        })
    }
}