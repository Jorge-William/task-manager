// CRUD create, read, update, delete

const { MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect database.');
	}
	const db = client.db(databaseName)

	// ------------------findOne() (retorno o primeiro registro que bater com a descrição)--------------------------------

	db.collection('users').findOne({ completed: true }, (error, user) => {
		if (error) {
			return console.log(error);
		}
		console.log(user);
	})

	// ---------------------------find() (vários retornos em um array de objetos) ---------------------------------

	db.collection('tasks').find({ completed: false }).toArray((error, user) => {
		if (error) {
			return console.log(error)
		}
		console.log(user);
	})

	// ---------------------------------------------------------------------


})


