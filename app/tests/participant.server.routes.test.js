'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Participant = mongoose.model('Participant'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, participant;

/**
 * Participant routes tests
 */
describe('Participant CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Participant
		user.save(function() {
			participant = {
				name: 'Participant Name'
			};

			done();
		});
	});

	it('should be able to save Participant instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Participant
				agent.post('/participants')
					.send(participant)
					.expect(200)
					.end(function(participantSaveErr, participantSaveRes) {
						// Handle Participant save error
						if (participantSaveErr) done(participantSaveErr);

						// Get a list of Participants
						agent.get('/participants')
							.end(function(participantsGetErr, participantsGetRes) {
								// Handle Participant save error
								if (participantsGetErr) done(participantsGetErr);

								// Get Participants list
								var participants = participantsGetRes.body;

								// Set assertions
								(participants[0].user._id).should.equal(userId);
								(participants[0].name).should.match('Participant Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Participant instance if not logged in', function(done) {
		agent.post('/participants')
			.send(participant)
			.expect(401)
			.end(function(participantSaveErr, participantSaveRes) {
				// Call the assertion callback
				done(participantSaveErr);
			});
	});

	it('should not be able to save Participant instance if no name is provided', function(done) {
		// Invalidate name field
		participant.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Participant
				agent.post('/participants')
					.send(participant)
					.expect(400)
					.end(function(participantSaveErr, participantSaveRes) {
						// Set message assertion
						(participantSaveRes.body.message).should.match('Please fill Participant name');
						
						// Handle Participant save error
						done(participantSaveErr);
					});
			});
	});

	it('should be able to update Participant instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Participant
				agent.post('/participants')
					.send(participant)
					.expect(200)
					.end(function(participantSaveErr, participantSaveRes) {
						// Handle Participant save error
						if (participantSaveErr) done(participantSaveErr);

						// Update Participant name
						participant.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Participant
						agent.put('/participants/' + participantSaveRes.body._id)
							.send(participant)
							.expect(200)
							.end(function(participantUpdateErr, participantUpdateRes) {
								// Handle Participant update error
								if (participantUpdateErr) done(participantUpdateErr);

								// Set assertions
								(participantUpdateRes.body._id).should.equal(participantSaveRes.body._id);
								(participantUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Participants if not signed in', function(done) {
		// Create new Participant model instance
		var participantObj = new Participant(participant);

		// Save the Participant
		participantObj.save(function() {
			// Request Participants
			request(app).get('/participants')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Participant if not signed in', function(done) {
		// Create new Participant model instance
		var participantObj = new Participant(participant);

		// Save the Participant
		participantObj.save(function() {
			request(app).get('/participants/' + participantObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', participant.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Participant instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Participant
				agent.post('/participants')
					.send(participant)
					.expect(200)
					.end(function(participantSaveErr, participantSaveRes) {
						// Handle Participant save error
						if (participantSaveErr) done(participantSaveErr);

						// Delete existing Participant
						agent.delete('/participants/' + participantSaveRes.body._id)
							.send(participant)
							.expect(200)
							.end(function(participantDeleteErr, participantDeleteRes) {
								// Handle Participant error error
								if (participantDeleteErr) done(participantDeleteErr);

								// Set assertions
								(participantDeleteRes.body._id).should.equal(participantSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Participant instance if not signed in', function(done) {
		// Set Participant user 
		participant.user = user;

		// Create new Participant model instance
		var participantObj = new Participant(participant);

		// Save the Participant
		participantObj.save(function() {
			// Try deleting Participant
			request(app).delete('/participants/' + participantObj._id)
			.expect(401)
			.end(function(participantDeleteErr, participantDeleteRes) {
				// Set message assertion
				(participantDeleteRes.body.message).should.match('User is not logged in');

				// Handle Participant error error
				done(participantDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Participant.remove().exec();
		done();
	});
});