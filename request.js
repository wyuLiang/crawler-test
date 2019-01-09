const request = require("request");

const getPage = async function(url){
    return new Promise((resolve, reject) => {
        request.get(url, function(err, response, body){
            if(err){
                return reject(err);
            }else {
                return resolve(body);
            }
        })
    })

};


module.exports = {
    getPage
};