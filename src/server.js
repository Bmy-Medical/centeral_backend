const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/connection');
const setupAssociations = require("./models/association");
const permissionRoute = require('./routes/permissionRoute');
const roleRoute = require('./routes/roleRoute');
const userRoute = require('./routes/userRoute')
const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const apiRouter = express.Router();
app.use("/api/v1", apiRouter);
apiRouter.use('/permission',permissionRoute)
apiRouter.use('/role',roleRoute)
apiRouter.use('/users',userRoute)



// app.use(errorHandler);


sequelize.sync({ force: false }).then(() => {
    console.log('Database connected and models synchronized.');
}).catch(err => {
    console.error('Error connecting to the database:', err);
});

setupAssociations();

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


