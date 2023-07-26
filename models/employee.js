'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.hasMany(models.Sales_data, { foreignKey: 'employee_id' })
    }
  }
  Employee.init({
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
          args: true
        },
        notEmpty: {
          msg: "Please enter your name",
          args: true
        }
      }
    }, 
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your job title",
          args: true
        },
        notEmpty: {
          msg: "Please enter your job title",
          args: true
        }
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your salary",
          args: true
        },
        notEmpty: {
          msg: "Please enter your salary",
          args: true
        }
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your department",
          args: true
        },
        notEmpty: {
          msg: "Please enter your department",
          args: true
        }
      }
    },
    joined_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your joined date",
          args: true
        },
        notEmpty: {
          msg: "Please enter your joined date",
          args: true
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password",
          args: true
        },
        notEmpty: {
          msg: "Please enter your password",
          args: true
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  Employee.beforeCreate(instance => {
    instance.password = hashPassword(instance.password)
  })
  return Employee;
};