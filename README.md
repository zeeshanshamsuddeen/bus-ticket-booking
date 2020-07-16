# Bus Ticket Booking Server
A simple bus booking server using NodeJS and ExpressJS.

## Table of Contents

- [Introduction](#introduction)
- [APIs](#apis)
- [Quick Start](#quick-start)
- [Improvements](#improvements)



## Introduction

The project contains mainly 4 resources

- Buses
- Seats
- Tickets
- Passengers

All the bookings currently are associated with a single bus.
Seats can be OPEN or BOOKED. All the seats are initially OPEN.
Tickets can be BOOKED or CANCELLED. Updates to canceled tickets are not allowed.


## APIs

- `GET: /api/v1/seats?status=OPEN/BOOKED`

  Get the list of seats on the bus based on status.

- `GET: /api/v1/tickets?status=BOOKED/CANCELLED`

  Get the list of tickets on the bus based on status.

- `GET: /api/v1/tickets/<Ticket ID>`

  Get ticket information using Ticket ID.

- `GET: /api/v1/tickets/<Ticket ID>/passenger`

  Get the Passenger information using a Ticket ID.

- `POST: /api/v1/tickets`
`payload:
{
  "name":"David",
  "sex":"MALE",
  "age":"24",
  "email":"david@abc.com",
  "phone":"9876543210"
}`

  Book a ticket. When a ticket is booked, a ticket document and a passenger document is created and the seat status is changed to BOOKED.

- `PUT: /api/v1/tickets/<Ticket ID>`
`payload:
{
  "name":"David John"
}`

  Update a ticket using a Ticket ID. Currently, only the passenger information update is allowed. Updates to Cancelled tickets are not allowed.

- `DELETE: /api/v1/tickets/<Ticket ID>`

  Delete/cancel a ticket using a Ticket ID. The ticket information is retained, and the passenger information is removed currently.

- `POST: /api/v1/admin/tickets/reset`

  Admin route: All seats are Opened. Tickets and passenger information is cleared.


Note: All routes can be extended for bus specific operations.


A successful response will be

200: `{ success: true, data: {} }` or `{ success: true, data: [] }`



## Quick Start

- `npm run test` - To run tests

- `npm run start` - To start the server

- `npm run initialize-data` - To create initial seats


## Improvements

- All routes are currently open. User/Admin Validation using JSON web tokens can be added.
- Shorted IDs can be used instead of UUID.
-  HTTP codes should lie in the express layer. The core layer should use some other statuses and they should be mapped in the express layer.
- Test Cases are week. Test functions can be moved out of the main test file.
