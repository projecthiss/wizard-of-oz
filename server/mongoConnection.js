const mongoose= require('mongoose')
require('dotenv').config({path:__dirname+'/./../.env'})


const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@hiss-db.4ai6e.mongodb.net/${process.env.ENVIRONMENT}?retryWrites=true&w=majority`;
console.log(MONGO_URI);

mongoose.connect(
	MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
);

module.exports = {
    mongoose
}
