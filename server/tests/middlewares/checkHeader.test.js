var expect = require('chai').expect;
var sinon  = require('sinon');    
var httpMocks = require('node-mocks-http');
const { checkXuserHeader } = require('../../middlewares/checkHeader');
const { DbService } = require('../../database/db.service');

    before(() => {
        //mocking dbservice to avoid tests from logging
        sinon.stub(DbService, 'addRequestLog').callsFake(() => {
            return 0;
        })
    })

    describe('Testing checkXuserHeader middleware', function() {
      it('it should throw error when x-user header is not found found', function() {    
        const nextSpy = sinon.spy();    
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        checkXuserHeader(req, res, nextSpy);

        expect(res.statusCode).to.equal(403);
        expect(res._getData()).to.equal('Unauthorised user, x-user header must be an email');
        expect(nextSpy.calledOnce).to.be.false;
      });

      it('it throws error when x-user is not a valid email', function() {
        const nextSpy = sinon.spy(); 
        const req = httpMocks.createRequest({
            headers: {
                'x-user': 'test.string@com'
            }
        });
        const res = httpMocks.createResponse();

        checkXuserHeader(req, res, nextSpy);
        expect(res.statusCode).to.equal(403);
        expect(res._getData()).to.equal('Unauthorised user, x-user header must be an email');
        expect(nextSpy.calledOnce).to.be.false;
      });

      it('calls the next function when x-user header is valid eamil', function() {
        const nextSpy = sinon.spy(); 
        const req = httpMocks.createRequest({
            headers: {
                'x-user': 'test.string@test.com'
            }
        });
        checkXuserHeader(req, {}, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      })
    });