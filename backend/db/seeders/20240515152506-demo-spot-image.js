'use strict';


const { SpotImage } = require('../models')

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
    */ await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "www.google.com/1",
          preview: false,
        },
        {
          spotId: 2,
          url: "www.google.com/2",
          preview: false,
        },
        {
          spotId: 3,
          url: "www.google.com/3",
          preview: false,
        }
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    return await queryInterface.bulkDelete(options)
  }
};
