module.exports = function idExist(id) {
  // if id exist in DB
  Client.find({ ID: id }, function (err, foundClient) {
    if (foundClient != []) return false;
  });
  return true;
};
