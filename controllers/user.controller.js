const { sendErrorResponse } = require("../helpers/send_error_res")
const Role = require("../models/role.model")
const User = require("../models/users.model")
const bcrypt = require('bcrypt')

const addUser = async (req, res) => {
    try {
        const {full_name, phone, email, password, confirm_password, } = req.body

        const candidate = await User.findOne({where: {email}});
        if (candidate){
            return sendErrorResponse({message: "There is user on this email"}, res, 400)
        }

        if(password !== confirm_password){
            return sendErrorResponse({message: "Password not maching"}, res, 400)
        }
        
        const hashed_password = await bcrypt.hash(password, 7)
    
        const result = await User.create({full_name, phone, email, hashed_password})
        res.status(201).send({message: "Created", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const getAll = async (req, res) => {
    try {
        const result = await User.findAll({
            include: [
                {
                    model: Role,
                    attributes: ["name"],
                    through: {attributes: [] }
                }
            ],
        })

        res.status(200).send({message: "Successfull", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, phone } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        user.full_name = full_name || user.full_name;
        user.phone = phone || user.phone;

        await user.save();
        res.status(200).send({ message: "User updated", user });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};



module.exports = {
    addUser, 
    getAll,
    update,
    remove
}