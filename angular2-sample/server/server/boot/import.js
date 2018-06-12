'use strict';
const customerTypeJson = require('../../common/models/customer-type.json');
const customerJson = require('../../common/models/customer.json');

module.exports = function (app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  const CustomerType = app.models.CustomerType;
  const Customer = app.models.Customer;

  CustomerType.create(customerTypeJson.examples).then(() => {
    return Customer.create(customerJson.examples);
  }).then(() => {
    return process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
  });
};
