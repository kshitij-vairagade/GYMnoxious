const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const getStats = async(req, res, next) => {
    try{
        const data = fs.readFileSync(path.join(__dirname,"./gymStats.json"));
        const stats = JSON.parse(data);
        const gymStats = stats.find(gym => gym.id === 
    Number(req.params.id));
        if (!gymStats){
            const err = new Error("Gym not found");
            err.status = 404;
            throw err;
        }
        res.json(gymStats);
    }   catch(e){
        next(e);
    }
};

router
    .route("/api/v1/stats/:id")
    .get(getStats);

module.exports = router;