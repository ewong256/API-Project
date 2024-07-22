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
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620637/ffxiv_07212024_220721_183_lf2nnu.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620646/ffxiv_07212024_220840_631_tfv8dm.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620655/ffxiv_07212024_220934_423_vnfsn9.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620663/ffxiv_07212024_221111_743_tl77gm.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620692/ffxiv_07212024_221254_978_wfbsj3.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620701/ffxiv_07212024_221422_471_xxs8c0.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://res.cloudinary.com/drpidiczb/image/upload/v1721620715/ffxiv_07212024_221517_583_wxwrm5.png",
          preview: true,
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
