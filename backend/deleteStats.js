const deleteStats = async(req, res, next) => {
    try{
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const gymStats = stats.find(gym => gym.id === Number(req.params.id));
        if (!gymStats){
            const err = new Error("Gym not found");
            err.status = 404;
            throw err;
        }
        const newStats = stats.map(gym => {
            if(gym.id === Number(req.params.id)){
                return null;
            } else{
                return gym;
            }
        })
        .filter(gym => gym !== null);
        fs.writeFileSync(statsFilePath, JSON.stringify(newStats));
        res.status(200).end();
    }   catch(e){
        next(e);
    }
};

router
    .route("/api/v1/stats/:id")
    .get(getStats)
    .put(updateStats)
    .delete(deleteStats);