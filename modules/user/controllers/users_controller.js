module.exports.getUser = (req, res) => {
    res.send({ user: 'isOkay'});
};

module.exports.test = (req, res) => {
    res.send({status: 'service is up!'});
} 