var siteModel = require('../../models/site');

module.exports = async function category(req, res, next){
    global.category = await siteModel.category();
   
    next();
}