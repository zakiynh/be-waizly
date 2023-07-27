const { Employee } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");

class EmployeeController {
  static async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        throw {
          name: "Bad Request",
          message: "Name and Password are required",
        };
      }
      const employee = await Employee.findOne({ where: { name } });
      if (!employee) {
        throw {
          name: "Unauthorized",
          message: "Invalid name or password",
        };
      }
      const valid = comparePassword(password, employee.password);
      if (!valid) {
        throw {
          name: "Unauthorized",
          message: "Invalid name or password",
        };
      }
      const access_token = signPayload({
        id: employee.id,
        name: employee.name,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      // console.log("err: ", err);
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, password, job_title, salary, department } = req.body;
      await Employee.create({ name, password, job_title, salary, department });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }

  static async getAllEmployee(req, res, next) {
    try {
      const employees = await Employee.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(employees);
    } catch (err) {
      next(err);
    }
  }

  static async getByIdEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!employee) {
        throw {
          name: "Not Found",
          message: "Employee not found",
        };
      }
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }

  static async addEmployee(req, res, next) {
    try {
      const { name, password, job_title, salary, department, joined_date } = req.body;
      await Employee.create({ name, password, job_title, salary, department, joined_date });
      res.status(201).json({ message: "Employee successfully added" });
    } catch (err) {
      next(err);
    }
  }

  static async updateEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password, job_title, salary, department, joined_date } = req.body;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw {
          name: "Not Found",
          message: "Employee not found",
        };
      }
      if (password) {
        const hashedPassword = await hashPassword(password);
        await Employee.update({ name, password: hashedPassword, job_title, salary, department, joined_date }, { where: { employee_id: id } });
      } else {
        await Employee.update({ name, job_title, salary, department, joined_date }, { where: { employee_id: id } });
      }
      res.status(200).json({ message: "Employee successfully updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw {
          name: "Not Found",
          message: "Employee not found",
        };
      }
      await Employee.destroy({ where: { employee_id: id } });
      res.status(200).json({ message: "Employee successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployeeController;
