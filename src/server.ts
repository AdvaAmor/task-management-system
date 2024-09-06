import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import createProjectRoutes from './routes/projectRoutes';
import createTaskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import {MongoProjectDao} from './dao/MongoProjectDao';
import {MongoTaskDao} from './dao/MongoTaskDao';

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const projectRoutes =createProjectRoutes(new MongoProjectDao(), new MongoTaskDao());
const taskRoutes = createTaskRoutes(new MongoTaskDao(), new  MongoProjectDao());

app.use('/projects',projectRoutes);
app.use('/tasks',taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//BanA  Ban1993!@#

//YakirA YakirA1993!

// userType: 'admin' | 'user';


// Client ID= 524fjfs1kfpplperrup220mjkf

/// User pool= eu-north-1_9UJ3yHIZB
