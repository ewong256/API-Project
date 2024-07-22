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
        userId: 2,
        review: 'Very nice apartment!',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Awesome loft!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 5,
        review: 'Very nice apartment!',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 6,
        review: 'Awesome loft!',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 4,
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 11,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 12,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 13,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 14,
        userId: 1,
        review: 'Such a cozy cabin!',
        stars: 5,
      },
      {
        spotId: 15,
        userId: 1,
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
