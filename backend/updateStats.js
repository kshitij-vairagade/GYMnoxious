const updateStats = async(req, res, next) => {
    try{
        const data = fs.reafFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const gymStats = stats.find(gym => gym.id === Number(req.params.id));
        if (!gymStats){
            const err = new Error("Gym not found");
            err.status = 404;
            throw err;
        }
        const newStatsData = {
            id: req.body.id,
            name: req.body.name,
            location: req.body.location,
            service: req.body.service,
            contact: req.body.contact,
        };
        const newStats = stats.map(gym => {
            if(gym.id == Number(req.params.id)){
                return newStatsData;
            }else{
            return gym;
        }
        });
        fs.writeFileSync(statsFilePath, JSON.stringify(newStats));
        res.status(200).json(newStatsData);
    }   catch(e){
        next(e);
    }
};

router
    .route("/api/v1/stats/:id")
    .get(getStats)
    .put(updateStats);