'use strict';

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in the options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-05-01',
        endDate: '2024-05-08',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-04-01',
        endDate: '2024-04-08',
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2024-06-01',
        endDate: '2024-06-08',
      }

     ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    return await queryInterface.bulkDelete(options)
  }
};
