'use strict';

const { Review } = require('../models')

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
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Very nice apartment!',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Awesome loft!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Such a cozy cabin!',
        stars: 5,
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
    options.tableName = 'Reviews'
    return await queryInterface.bulkDelete(options)
  }
};
