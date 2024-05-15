'use strict';

const { Spot } = require('../models')

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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Street St',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 40.1,
        lng: 70.2,
        name: 'Apt Apartment',
        description: 'Quite a nice apartment!',
        price: 150.0
      },
      {
        ownerId: 2,
        address: '456 Lane St',
        city: 'Boston',
        state: 'Massachusetts',
        country: 'United States',
        lat: 45.7,
        lng: 60.5,
        name: 'City Loft',
        description: 'Modern loft with a stunning view',
        price: 200.0
      },
      {
        ownerId: 3,
        address: '789 Avenue St',
        city: 'Hudson',
        state: 'New Hampshire',
        country: 'United States',
        lat: 63.4,
        lng: 31.6,
        name: 'Cozy Cabin',
        description: 'A very cozy cabin',
        price: 150.0
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
    options.tableName = 'Spots'
    return await queryInterface.bulkDelete(options)
  }
};
