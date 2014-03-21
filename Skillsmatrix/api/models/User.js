/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,

	attributes: {

		name: {
			type: 'string',
			required: true,
		},

		familyname: {
			type: 'string',
		},

		title: {
			type: 'string',
		},

		email: {
			type: 'email',
			required: true,
			email: true,
			unique: true
		},

		birthday: {
			type: 'date',
		},

		phone: {
			type: 'string',
		},

		address: {
			type: 'string',
		},

		postal: {
			type: 'string',
		},

		city: {
			type: 'string',
		},

		country: {
			type: 'string',
		},

		encryptedPassword: {
			type: 'string',
		},

		profileUrl: {
			type: 'string',
		},

		online: {
			type: 'boolean',
			defaultsTo: false
		},

		admin: {
			type: 'boolean',
			defaultsTo: false
		},
		
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmation;
			delete obj.encryptedPassword;
			delete obj._csrf;
			return obj;
		}
	},

	beforeValidation: function(values, next) {
		console.log(values)
		if (typeof values.admin !== 'undefined') {
			if(values.admin === 'unchecked') {
				values.admin = false;
			} else if(values.admin[1] === 'on') {
				values.admin = true;
			}
		}
		next();
	},

	beforeCreate: function (values, next) {

		// This checks to makes sure the password an password confirmation match before creating record
		if(!values.password || values.password != values.confirmation) {
			return next({err: ["Password doesn't match password confirmation."]});
		}

		require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if(err) return next(err);
			values.encryptedPassword = encryptedPassword;
			// values.online= true;
			next();
		});
	}

};
