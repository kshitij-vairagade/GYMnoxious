const createStats = async(req, res, next) => {
    try{
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const newStats = {
            id: req.body.id,
            name: req.body.name,
            location: req.body.location,
            service: req.body.service,
            contact: req.body.contact,
        };
        stats.push(newStats);
        fs.writeFileSync(statsFilePath, JSON.stringify(stats));
        res.status(201).json(newStats);
    } catch(e){
        next(e);
    }
};

router
    .route("/api/v1/stats")
    .post(createStats)