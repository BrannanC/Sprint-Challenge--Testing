const request = require('supertest');

const Games = require('./gamesModel');
const db = require('../data/dbConfig.js');

describe('gamesModel.js', () => {
    afterEach(async () => {
        await db('games').truncate();
     })

     describe('insert', () => {
        it('should insert a game', async () => {
            const game = await Games.insert({ title: 'Portal II', genre: 'Puzzle' });
            expect(game.title).toBe('Portal II');
            expect(game.Genre).toBe('Puzzle');
            expect(game.id).toBe(1);
        });
     });
});