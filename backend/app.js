const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const path = require("path");
const cors = require('cors');
require('dotenv').config()

// import routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const serviceRoutes = require("./routes/service.route");
const brainTreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");


// app
const app = express();
app.use(cors())

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=> console.log('DB Connected')).catch((err)=> console.log("DB Error" + err))

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())

// routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",serviceRoutes);
app.use("/api",brainTreeRoutes);
app.use("/api",orderRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

 