const config = {
  appDefaults: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    database: {
      url: process.env.DATABASE_URL,
      name: process.env.DATABASE_NAME,
    },
  },

  tokens: {
    webUser: {
      secret: 'VeIFYfFlueAi2sgz7KgFdDrb7214Kml0sLyAbNeYEynbZfqIWWqTCwbwVU1yKeZ1xmmHkeJc0vbUf8yG9EuA65WUq7aBPL2iNUXSaDtro39DTZk4pqO0bS909Bdo9H5V3vn7lNSDDT7GITJibEfACj7s6i5gUYhF8qRd4FlBUzFpQwFDkDJU9lEfmBOi8dewsHs7LXnNCbDv84144AQGchKz5eusTq0TTHOSoPAOR5D5orGiLazSQvlVr1gV0X9f',
      issuer: 'API ISSUER ZQmPLlL2iCSoUnhi335DpUsHoUvX7VZdviYQQhMyVy2SCgIMfmeisO6iwEJjT2CB',
      audience: 'API AUDIENCE aWmAVf5JpAEr3YWNsesLRLLrE5wBEorFsdnphOTyVxrQ2Cxa5tsWuZK3YDnINM6s',
    },
  },
};

module.exports = config;
