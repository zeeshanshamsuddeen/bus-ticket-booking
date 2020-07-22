require('../initiateEnv');
require('../dbHandlers/dbConnector');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { keywords } = require('../constants');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

let ticketId;

const getSeats = (done, status, seats) => {
  chai.request(server)
    .get(`/api/v1/seats?status=${status}`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.seats.should.be.a('array');
      res.body.seats.length.should.be.eql(seats);
      done();
    });
};

const getTickets = (done, status, tickets) => {
  chai.request(server)
    .get(`/api/v1/tickets?status=${status}`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.tickets.should.be.a('array');
      res.body.tickets.length.should.be.eql(tickets);
      done();
    });
};

const bookInvalidTicket = (done) => {
  const passengerInfo = {
    name: 'abc',
    sex: 'MALE',
    age: '24',
    phone: '9876543210',
  };
  chai.request(server)
    .post('/api/v1/tickets')
    .send(passengerInfo)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(false);
      done();
    });
};

const bookValidTicket = (done) => {
  const passengerInfo = {
    name: 'abc',
    sex: 'MALE',
    age: '24',
    email: 'abc@abc.com',
    phone: '9876543210',
  };
  chai.request(server)
    .post('/api/v1/tickets')
    .send(passengerInfo)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      res.body.should.have.property('ticketId');
      res.body.ticketId.should.be.a('string');
      ticketId = res.body.ticketId;
      done();
    });
};

const updateTicket = (done, updateObject) => {
  chai.request(server)
    .put(`/api/v1/tickets/${ticketId}`)
    .send(updateObject)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      done();
    });
};

const checkUpdatedPassenger = (done, updateObject) => {
  chai.request(server)
    .get(`/api/v1/tickets/${ticketId}/passenger`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      res.body.should.have.property('passenger');
      res.body.passenger.should.be.a('object');
      res.body.passenger.name.should.be.eql(updateObject.name);
      done();
    });
};

const adminReset = (done) => {
  chai.request(server)
    .post('/api/v1/admin/seats/reset')
    .send()
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      done();
    });
};

const deleteTicket = (done) => {
  chai.request(server)
    .delete(`/api/v1/tickets/${ticketId}`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      done();
    });
};

const checkDeletedPassenger = (done) => {
  chai.request(server)
    .get(`/api/v1/tickets/${ticketId}/passenger`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(404);
      done();
    });
};

const checkTicketStatus = (done, status) => {
  chai.request(server)
    .get(`/api/v1/tickets/${ticketId}`)
    .end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.eql(true);
      res.body.should.have.property('ticket');
      res.body.ticket.should.be.a('object');
      res.body.ticket.status.should.be.eql(status);
      done();
    });
};

describe('Admin Reset', () => {
  // Test the /POST route
  describe('/POST admin reset', () => {
    it('it should Reset all seats', (done) => adminReset(done));
  });
});

describe('Seats', () => {
  // Test the GET route for seats
  describe('/GET seats', () => {
    it('it should GET all OPEN seats', (done) => getSeats(done, keywords.OPEN, 40));
    it('it should GET all BOOKED seats', (done) => getSeats(done, keywords.BOOKED, 0));
    // more tests for Invalid params
  });
});

describe('Tickets', () => {
  // Test the GET route for tickets
  describe('GET tickets', () => {
    it('it should GET 40 BOOKED tickets', (done) => getTickets(done, keywords.BOOKED, 0));
    it('it should GET 0 CANCELLED tickets', (done) => getTickets(done, keywords.CANCELLED, 0));
    // more tests for Invalid params
  });

  // Test the POST route for tickets
  describe('Book Ticket', async () => {
    it('it should not Book Ticket with Invalid data', (done) => bookInvalidTicket(done));
    it('it should Book Ticket with Valid data', (done) => bookValidTicket(done));
    it('it should GET 39 OPEN seats', (done) => getSeats(done, keywords.OPEN, 39));
    it('it should GET 1 BOOKED seats', (done) => getSeats(done, keywords.BOOKED, 1));
  });

  // Test the PUT route for tickets and GET route for passenger
  describe('Update ticket', async () => {
    const updateObject = { name: 'abc def' };
    it('it should Update the Ticket', (done) => updateTicket(done, updateObject));
    it('confirm update was successful', (done) => checkUpdatedPassenger(done, updateObject));
    // more tests for Invalid Update objects, Invalid Ticket ID
  });

  // Test the DELETE route for tickets
  describe('Delete ticket', async () => {
    it('it should Delete the Ticket', (done) => deleteTicket(done));
    it('confirm Ticket Status is changed', (done) => checkTicketStatus(done, keywords.CANCELLED));
    it('confirm Passengers are deleted', (done) => checkDeletedPassenger(done));
    it('it should GET 0 BOOKED tickets', (done) => getTickets(done, keywords.BOOKED, 0));
    it('it should GET 1 CANCELLED tickets', (done) => getTickets(done, keywords.CANCELLED, 1));
    it('it should GET 40 OPEN seats', (done) => getSeats(done, keywords.OPEN, 40));
    it('it should GET 0 BOOKED seats', (done) => getSeats(done, keywords.BOOKED, 0));
    // more tests for Invalid Ticket ID
  });
});
