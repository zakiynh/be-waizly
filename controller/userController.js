const { Employee } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signPayload } = require('../helpers/jwt')

class UserController {
    static async login(req, res, next) {
        try {
            const { name, password } = req.body
            if (!name || !password) {
                throw {
                    name: "Bad Request",
                    message: "Name and Password are required"
                }
            }
            const employee = await Employee.findOne({
                where: {
                    name
                }
            })
            if (!employee) {
                throw {
                    name: "Unauthorized",
                    message: "Invalid name or password"
                }
            }
            const valid = comparePassword(password, employee.password)
            if (!valid) {
                throw {
                    name: "Unauthorized",
                    message: "Invalid name or password"
                }
            }
            const access_token = signPayload({
                id: employee.id,
                name: employee.name
            })
            res.status(200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { name, password, job_title, salary, department } = req.body
            await Employee.create({
                name,
                password,
                job_title,
                salary,
                department,
            })
            res.status(204).json()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController