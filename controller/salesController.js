const { Sales_data } = require('../models');
const { Employee } = require('../models');

class SalesController {
  static async getAllSales(req, res, next) {
    try {
      const sales = await Sales_data.findAll({
        include: [{
          model: Employee,
          attributes: { exclude: ['password'] }
        }]
      });
      res.status(200).json(sales);
    } catch (err) {
      next(err);
    }
  }

  static async getByIdSales(req, res, next) {
    try {
      const { id } = req.params;
      const sale = await Sales_data.findByPk(id, {
        include: [{
          model: Employee,
          attributes: { exclude: ['password'] }
        }]
      });
      if (!sale) {
        throw {
          name: "Not Found",
          message: "Sales data not found",
        };
      }
      res.status(200).json(sale);
    } catch (err) {
      next(err);
    }
  }

  static async addSales(req, res, next) {
    try {
      const { employee_id, sales } = req.body;
      await Sales_data.create({ employee_id, sales });
      res.status(201).json({ message: "Sales data successfully added" });
    } catch (err) {
      next(err);
    }
  }

  static async updateSales(req, res, next) {
    try {
      const { id } = req.params;
      const { employee_id, sales } = req.body;
      const sale = await Sales_data.findByPk(id);
      if (!sale) {
        throw {
          name: "Not Found",
          message: "Sales data not found",
        };
      }
      await Sales_data.update({ employee_id, sales }, { where: { sales_id: id } });
      res.status(200).json({ message: "Sales data successfully updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteSales(req, res, next) {
    try {
      const { id } = req.params;
      const sale = await Sales_data.findByPk(id);
      if (!sale) {
        throw {
          name: "Not Found",
          message: "Sales data not found",
        };
      }
      await Sales_data.destroy({ where: { sales_id: id } });
      res.status(200).json({ message: "Sales data successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SalesController;