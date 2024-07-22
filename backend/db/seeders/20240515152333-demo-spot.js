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
        ownerId: 1,
        address: '124 Street St',
        city: 'Tuliyolal',
        state: 'Yak Tel',
        country: 'Tural',
        lat: 40.1,
        lng: 70.2,
        name: 'Palace',
        description: 'Rule the throne',
        price: 178.0
      },
{
        ownerId: 1,
        address: '124 Street St',
        city: 'Tuliyolal',
        state: 'Urqopacha',
        country: 'Tural',
        lat: 40.1,
        lng: 70.2,
        name: 'Tent Setup',
        description: 'Campout in Urqopacha',
        price: 178.0
      },
{
        ownerId: 10,
        address: '128 Street St',
        city: 'Solution 9',
        state: 'Cyber City',
        country: 'Tural',
        lat: 40.1,
        lng: 70.2,
        name: 'CyberBunks',
        description: 'Relax at CyberBunks',
        price: 150.0
      },
{
        ownerId: 7,
        address: '128 Street St',
        city: 'Solution 9',
        state: 'Cyber City',
        country: 'Tural',
        lat: 40.6,
        lng: 70.2,
        name: 'CyberPunks',
        description: 'Dont Relax at CyberPunks',
        price: 150.0
      },
{
        ownerId: 1,
        address: '123 Samurai St',
        city: 'Kugane',
        state: 'Ruby Sea',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Kugane Tower',
        description: 'Climb the tower',
        price: 150.0
      },
{
        ownerId: 12,
        address: '123 Samurai St',
        city: 'Kugane',
        state: 'Ruby Sea',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Kugane Spa',
        description: 'Relax at the Kugane Hot Springs',
        price: 150.0
      },
{
        ownerId: 3,
        address: '123 Market Board Rd',
        city: 'Old Sharlayan',
        state: 'The Hinterlands',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Sharlayan Library',
        description: 'Library of all',
        price: 150.0
      },
{
        ownerId: 4,
        address: '123 Market Board Rd',
        city: 'Old Sharlayan',
        state: 'The Hinterlands',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Sharlayan Library',
        description: 'Library of all',
        price: 150.0
      },
{
        ownerId: 14,
        address: '123 Hub Street',
        city: 'Limsa',
        state: 'Limsa Lominsa',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Limsa Heights',
        description: 'Quite a nice apartment!',
        price: 150.0
      },
{
        ownerId: 13,
        address: '125 Hub St',
        city: 'Limsa',
        state: 'Limsa Lominsa',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Limsa Aetheryte',
        description: 'Kinda weird here...',
        price: 150.0
      },
{
        ownerId: 15,
        address: '123 Dragon Dr',
        city: 'The Firmament',
        state: 'Ishgard',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'The Pillars',
        description: 'This is a place...',
        price: 150.0
      },
{
        ownerId: 12,
        address: '188 Dragon Dr',
        city: 'The Firmament',
        state: 'Ishgard',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'The Vault',
        description: 'The things that transpired...',
        price: 150.0
      },
{
        ownerId: 9,
        address: '123 Gaia Ln',
        city: 'Eulmore',
        state: 'Shadow World',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Darkness',
        description: 'Quite a nice apartment!',
        price: 150.0
      },
{
        ownerId: 5,
        address: '123 Ryne Ln',
        city: 'Eulmore',
        state: 'Shadow World',
        country: 'Eorzea',
        lat: 40.1,
        lng: 70.2,
        name: 'Dwarf Fortress',
        description: 'Quite a nice apartment!',
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
