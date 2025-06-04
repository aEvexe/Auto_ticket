const { sendErrorResponse } = require("../helpers/send_error_res")
const Role = require("../models/role.model")
const User = require("../models/users.model")

const addRole = async (req, res) => {
    try {
        const {name, description} = req.body

        const position = await Role.findOne({where: { name: name.toLowerCase()}})
        if(position){
            return sendErrorResponse({message: "Bunday Role mavjud emas"}, res, 400)
        }
    
        const result = await Role.create({name: name.toLowerCase(), description})
        res.status(201).send({message: "Created", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const getAll = async (req, res) => {
    try {
        const result = await Role.findAll({
            include: [
                {
                    model: User
                }
            ]
        })

        res.status(200).send({message: "Successfull", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const result = await Role.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Role not found" });
        }

        result.name = name || result.name;
        await result.save();

        res.status(200).send({ message: "Role updated successfully", result: result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Role.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Role not found" });
        }

        await result.destroy();

        res.status(200).send({ message: "Role deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addRole,
    getAll,
    update, 
    remove
}