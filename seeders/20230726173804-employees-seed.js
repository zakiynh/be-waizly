'use strict';

const employee = require('../employees.json')
const { hashPassword } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const item of employee) {
      item.createdAt = new Date()
      item.updatedAt = new Date()

      item.password = hashPassword("123456")
    }
    await queryInterface.bulkInsert('Employees', employee, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {})
  }
};
