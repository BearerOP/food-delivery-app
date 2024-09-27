const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const { connectDB } = require('./db/dbConnection');
dotenv.config();

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Requested Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS
app.use(cors(corsOptions));

// CORS preflight
app.options('*', cors(corsOptions))

app.get('/', (req, res) => {
  res.send('The Pizza Point Backend is up. 😊');
});

app.use('/api/v1/user', require('./src/routes/user'));
app.use('/api/v1/menu', require('./src/routes/menu'));

connectDB();

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(
    `App listening on port ${host} on ${process.env.ENVIRONMENT}`
  );
});
