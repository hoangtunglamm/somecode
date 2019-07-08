module.exports = {
    validateOder : (req, res, next) =>{
        if(!req.body) res.json({"status": "error"})
    }
}