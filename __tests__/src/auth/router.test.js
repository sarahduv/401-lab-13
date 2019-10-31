'use strict';

process.env.SECRET='test';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      // eslint-disable-next-line no-unused-vars
      let encodedToken;
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            console.log('results.text line 45 is', results.text);
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });

      it('can signin with a good token', async () => {
        const results = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        const results2 = await mockRequest.get('/protected')
          .set('Authorization', 'bearer ' + results.text);
        expect(results2.text).toEqual('you have a valid token');        
      });

      it('can NOT signin with an expired token', async () => {
        const results = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        console.log('results.text from test', results.text);

        var token = jwt.verify(results.text, process.env.SECRET);
        token.generatedAt = 0;
        const tokenString = jwt.sign(token, process.env.SECRET);

        await mockRequest.get('/protected')
          .set('Authorization', 'bearer ' + tokenString)
          .expect(500);
                
      });

    });
    
  });
  
});