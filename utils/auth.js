const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://lavisht22.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://skiller-api.herokuapp.com",
  issuer: "https://lavisht22.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = {
  jwtCheck,
};
