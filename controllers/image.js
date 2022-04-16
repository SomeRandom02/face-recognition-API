const req = require("express/lib/request");
const { json } = require("express/lib/response");
const fetch = require("node-fetch");

const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
        "user_id": "somerandom",
        "app_id": "6c7c3a4c81fc4af5ad639a8fa04754db"
        },
        "inputs": [
        {
            "data": {
            "image": {
                "url": req.body.input
            }
            }
            }
        ]
    });
            
    const requestOptions = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Authorization': 'Key f682b1eca26145fe98484be1bc0fa948'
        },
        body: raw
    };
            
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
            
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then((response) => response.text())
        .then(result => {
            if (response) {
                res.json(result)
            }
        })
        .catch(err => res.status(400).json('unable to work with api'))
    
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entires', 1)
    .returning('entires')
    .then(entires => {
        res.json(entires[0].entires);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}