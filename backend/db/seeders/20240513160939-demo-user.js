'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'qwer',
        lastName: 'asdf',
        hashedPassword: bcrypt.hashSync('passwordispassword')
      },

{
        email: 'bakool@jaja.io',
        username: 'bakool-yaya',
        firstName: 'Bakool',
        lastName: 'Jaja',
        hashedPassword: bcrypt.hashSync('ihatezoraalja')
      },

{
        email: 'wrymwindthrust@dragoon.io',
        username: 'Geirskogul',
        firstName: 'Estinien',
        lastName: 'Wyrmblood',
        hashedPassword: bcrypt.hashSync('highjumper123')
      },


{
        email: 'gunbreaker@shadowbringer.io',
        username: 'this-is-thancred',
        firstName: 'Thancred',
        lastName: 'Waters',
        hashedPassword: bcrypt.hashSync('rynegaiafan123')
      },


{
        email: 'blackmage@user.io',
        username: 'kuroMage11',
        firstName: 'Yshtola',
        lastName: 'Rhul',
        hashedPassword: bcrypt.hashSync('leylinesfire4')
      },


{
        email: 'gamerguy@games.io',
        username: 'G-BAZOOKA99',
        firstName: 'Goblin',
        lastName: 'Bazooka',
        hashedPassword: bcrypt.hashSync('iliketft123')
      },

{
        email: 'hamachikama@games.io',
        username: 'hamakama',
        firstName: 'Laura',
        lastName: 'Arseid',
        hashedPassword: bcrypt.hashSync('ilikeyugioh123')
      },

{
        email: 'grahaguy@games.io',
        username: 'gratia',
        firstName: 'Graha',
        lastName: 'Tia',
        hashedPassword: bcrypt.hashSync('burgertaco123')
      },


{
        email: 'running11@games.io',
        username: 'runnercrafter',
        firstName: 'Din',
        lastName: 'Auros',
        hashedPassword: bcrypt.hashSync('ilikealpaca123')
      },

{
        email: 'poketmonster@games.io',
        username: 'pokemonfan123',
        firstName: 'Bagon',
        lastName: 'Flygon',
        hashedPassword: bcrypt.hashSync('salamencelover123')
      },

{
        email: 'omegaalpha1@games.io',
        username: 'omega-protocol',
        firstName: 'Alpha',
        lastName: 'Omega',
        hashedPassword: bcrypt.hashSync('rundynamisalpha')
      },

{
        email: 'maincharacter@games.io',
        username: 'protag123',
        firstName: 'Wuk',
        lastName: 'Lmao',
        hashedPassword: bcrypt.hashSync('dawntrailismine')
      },

{
        email: 'Steelix@games.io',
        username: 'Steelixx',
        firstName: 'Lexington',
        lastName: 'Steele',
        hashedPassword: bcrypt.hashSync('ilikeblumage123')
      },

{
        email: 'tatertotts@games.io',
        username: 'tarutotts',
        firstName: 'Tataru',
        lastName: 'Tataru',
        hashedPassword: bcrypt.hashSync('notapopoto123')
      },

{
        email: 'dragoonfan12@games.io',
        username: 'highjumper123',
        firstName: 'Griffith',
        lastName: 'Mogaku',
        hashedPassword: bcrypt.hashSync('berserkreference')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'bakool-yaya', 'Geirskogul', 'this-is-thancred', 'kuroMage11','G-BAZOOKA99', 'hamakama', 'gratia', 'runnercrafter', 'pokemonfan123', 'omega-protocol', 'protag123', 'Steelixx', 'tarutotts',  'highjumper123'  ] }
    }, {});
  }
};
