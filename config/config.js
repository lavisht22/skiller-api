module.exports = {
  development: {
    url: 'postgres://lavisht22@localhost/lavisht22?ssl=true',
    dialect: 'postgres',
  },
  test: { url: process.env.DATABASE_URL, dialect: 'postgres' },
  production: {
    url: `${process.env.DATABASE_URL}?ssl=true`,
    dialect: 'postgres',
  },
};
