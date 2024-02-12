const MysqlUrl = require('../models/url.model.mysql');
const Url = new MysqlUrl();
const validateUrlExistence = (req, res, next) => {
    Url.getOriginalUrl(req.body.originalUrl, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Error retrieving URL with id " + req.params.id + " not exists"
            });
        }
        req.url = result;
        next();
    });
}


module.exports = {
    validateUrlExistence
};