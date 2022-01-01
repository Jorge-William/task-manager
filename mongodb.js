// CRUD create, read, update, delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect database.');
	}
	const db = client.db(databaseName)

	// --------------------------------------- INSERT ONE 

	db.collection('users').insertOne({
		name: 'James Gosling',
		age: 64
	}, (error, result) => {
		if (error) {
			return console.log('Operation denied')
		}
		console.log(result.insertedId);
	})


	// console.log('Connected correctly');

	// --------------------------------------- INSERT MANY

	// db.collection('users').insertMany([
	// 	{
	// 		name: 'Danielle Elizabeth',
	// 		age: 41
	// 	}
	// 	, {
	// 		name: 'Gabrhiel Heringer',
	// 		age: 17
	// 	}
	// 	, {
	// 		name: 'Raphel Heringer',
	// 		age: 7
	// 	}, {
	// 		name: 'Mariah Heringer',
	// 		age: 2
	// 	}, {
	// 		name: 'Jorge William',
	// 		age: 36
	// 	}

	// ], (error, result) => {
	// 	if (error) {
	// 		return console.log('Não foi possível executar a operação.');
	// 	}
	// 	console.log(result.acknowledged);
	// })

	// db.collection('tasks').insertMany([
	// 	{
	// 		description: 'Wash my car',
	// 		completed: true
	// 	}, {
	// 		description: 'Walk with the dog.',
	// 		completed: false
	// 	}
	// ], (error, result) => {
	// 	if (error) {
	// 		return console.log("Operation not performed");
	// 	}

	// 	console.log(result.insertedCount);
	// })


})


