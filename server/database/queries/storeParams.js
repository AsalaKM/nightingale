// loops over array of dialogflow parameters
// calls update function as soon as the parameter is part of the response

// load storeInitParams query
const updateUserParams = require("./updateUserParams");

module.exports = (array, object, id) => new Promise((resolve, reject) => {
  if (
    array
      && array.includes(object)
      && Object.prototype.hasOwnProperty.call(object, "parameters")
  ) {
    array.map((e) => {
      // dialogfow terms....
      const param = e.parameters.fields;
      const { birthDate, leastFaveSubj, faveSubj } = param;

      if (birthDate) {
        resolve(updateUserParams(id, "birthDate", birthDate.stringValue));
      }
      if (faveSubj) {
        resolve(updateUserParams(id, "faveSubj", faveSubj.stringValue));
      }
      if (leastFaveSubj) {
        resolve(updateUserParams(id, "leastFaveSubj", leastFaveSubj.stringValue));
      }
    });
  }
  try {
    throw Error();
  } catch (e) {
    reject(e);
  }
});
