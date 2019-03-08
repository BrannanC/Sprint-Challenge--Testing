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

    describe('GET /games', () => {
        it('should return 200 ok', async () => {
            const res = await request(server).get('/games');
        expect(res.status).toEqual(200);
        });

        it('should return an empty array', async () => {
            const res = await request(server).get('/games');
        expect(res.body).toEqual([]);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/games');
        expect(res.type).toBe('application/json');
        });
    });

    describe('POST /games', () => {
        it('should return 201 status code', async () => {
            const game = ({ title: 'Portal II', genre: 'Puzzle' });
            const res = await request(server).post('/games').send(game);
            expect(res.status).toEqual(201);
        });

        it('should return JSON', async () => {
            const game = ({ title: 'Portal II', genre: 'Puzzle' });
            const res = await request(server).post('/games').send(game);
            expect(res.type).toBe('application/json');
        });

        it('should return inserted game', async () => {
            const game = ({ title: 'Portal II', genre: 'Puzzle' });
            const res = await request(server).post('/games').send(game);
            expect(res.body).toEqual({ title: 'Portal II', genre: 'Puzzle', id: 1 });
        });
    });
});

