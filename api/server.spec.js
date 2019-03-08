const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');

describe('server.js', () => {
    afterEach(async () => {
        await db('games').truncate();
     })
    it('should set testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});

