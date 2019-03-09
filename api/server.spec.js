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

    describe('GET /games:id', () => {
        it('should return 200 ok', async () => {
            const res = await request(server).get('/games/1');
        expect(res.status).toEqual(404);
        });

        it('should return a single game json object', async () => {
            const game = ({ title: 'Portal II', genre: 'Puzzle' });
            await request(server).post('/games').send(game);
            const res = await request(server).get('/games/1');
            expect(res.status).toEqual(200);
            expect(res.type).toBe('application/json');
            expect(res.body.game.title).toBe('Portal II');
            expect(res.body.game.genre).toBe('Puzzle');
            expect(res.body.game.id).toBe(1);
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
            const game = ({ title: 'Portal II', genre: 'Puzzle', releaseYear: 2011 });
            const res = await request(server).post('/games').send(game);
            expect(res.body.game).toEqual({ title: 'Portal II', genre: 'Puzzle', id: 1, releaseYear: 2011 });
        });

        it('should return status code 422 with no title', async () => {
            const game = ({ genre: 'Puzzle' });
            const res = await request(server).post('/games').send(game);
            expect(res.status).toEqual(422);
        });

        it('should return status code 405 with duplicate game', async () => {
            const game = ({ title: 'Portal II', genre: 'Puzzle', releaseYear: 2011 });
            await request(server).post('/games').send(game);
            const res = await request(server).post('/games').send(game);
            expect(res.status).toEqual(405);
        });
    });

    describe('DELETE /games', () => {
        it('should delete a game', async () => {
            const res = await request(server).delete('/games/1');
            expect(res.status).toEqual(404);

            const game = ({ title: 'Portal II', genre: 'Puzzle', releaseYear: 2011 });
            await request(server).post('/games').send(game);

            const res2 = await request(server).delete('/games/1');
            expect(res2.status).toEqual(204);
        });
    });
});

