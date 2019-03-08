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
            expect(game.genre).toBe('Puzzle');
            expect(game.id).toBe(1);
        });
     });

     describe('getAll', () => {
        it('return all games', async () => {
            let games = await Games.getAll();
            expect(games.length).toBe(0);
            await Games.insert({ title: 'Portal II', genre: 'Puzzle' });
            games = await Games.getAll();
            expect(games.length).toBe(1);
        });
     });

     describe('delete', () => {
        it('should remove a game', async () => {
            const game = await Games.insert({ title: 'Portal II', genre: 'Puzzle' });
            expect(game.title).toBe('Portal II');
            await Games.remove(1);
            const games = await Games.getAll();
            expect(games.length).toBe(0);
        });
     });
});