'use strict';

const sales_data = require('../sales_data.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const item of sales_data) {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    }
    await queryInterface.bulkInsert('Sales_data', sales_data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales_data', null, {})
  }
};
