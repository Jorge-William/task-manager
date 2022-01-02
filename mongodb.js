// CRUD create, read, update, delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect database.');
	}
	const db = client.db(databaseName)

	// -------------------- updateOne() ------------------------------
	// const updateOperation = db.collection('users').updateOne({
	// 	_id: new ObjectID('61ccd372e6220eeaa0fbd4dc')
	// }, {
	// 	$set: {
	// 		name: 'Jorge William'
	// 	}
	// })

	// updateOperation.then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })


	// ---------------------- updateMany() ------------------------------

	const updateMany = db.collection('tasks').updateMany({
		completed: false
	}, {
		$set: {
			completed: true
		}

	})

	updateMany.then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error);
	})

})


