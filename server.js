import express from 'express';
import cors from 'cors';
import path from "path";

if (process.env.NODE_ENV !== 'production')
{
    import dotenv from 'dotenv';
    dotenv.config();
} 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors);
// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());
//middleware to parse url string to exclude not allowed symbols
app.use(express.urlencoded({extended: true}));

if (process.env.NODE_ENV == 'production')
{
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) =>
        {
            res.sendFile(path.join(__dirname, 'client/build', 'index/html'));
        }
    )
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server is running on port ', port);
});