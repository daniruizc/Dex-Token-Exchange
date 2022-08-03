let should = require('chai')
	.use(require('chai-as-promised'))
	.should();

const ENV_VERSION = '2';

describe('ENV', () => {

	it('checks .env file is loaded', () => {
		should.exist(process.env.ENV_VERSION);
	})

	it('checks if .env version match', () => {
		process.env.ENV_VERSION.should.eq(ENV_VERSION, '.env version does not match');
	})

});