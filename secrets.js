const secrets = {
  'db_uri': 'mongodb://oles:vova12211@ds163119.mlab.com:63119/popcorn_store',
};

module.exports = {
  requestSecret: function(s) {
    return secrets[s];
  },
};
