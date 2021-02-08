const Category = require("../models/category.model")


exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "No such category found!!"
            });
        }
        req.category = category;
        next();
    })
}

exports.create = (req,res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: "Error from Category creater"
            });
        }
        res.json({data});
    });
}


exports.read = (req,res) => {
    return res.json(req.category)
}

exports.update = (req,res) => {
    const category =req.category
    category.name = req.body.name
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to update Category"
            });
        }
        res.json(data);

    })
}

exports.remove = (req,res) => {
    const category =req.category
    category.remove((err, data)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to remove Category"
            });
        }
        res.json({
            message:'Category deleted Successfully'
        });

    });
}



exports.list = (req,res) => {
    Category.find().exec((err, data)=> {
        if(err){
            return res.status(400).json({
                error: "Unable to show list of Category"
            });
        }
        res.json(data);
    });

}
