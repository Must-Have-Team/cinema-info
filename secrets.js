const secrets = {
  'db_uri': `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@ds163119.mlab.com:63119/${process.env.DB_NAME}`,
};

module.exports = {
  requestSecret: function(s) {
    return secrets[s];
  },
};
