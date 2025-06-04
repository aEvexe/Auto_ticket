const { sendErrorResponse } = require("../helpers/send_error_res")
const Driver = require("../models/drivers.model")

const addDriver = async (req, res) => {
    try {
        const {name, phone} = req.body
    
        const result = await Driver.create({name, phone})
        res.status(201).send({message: "Created", result})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAll = async (req, res) => {
    try {
        const result = await Driver.findAll({})

        res.status(200).send({message: "Successfull", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;

        const result = await Driver.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Driver not found" });
        }

        result.name = name || result.name;
        result.phone = phone || result.phone;
        await result.save();

        res.status(200).send({ message: "Driver updated successfully", result: result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Driver.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Driver not found" });
        }

        await result.destroy();

        res.status(200).send({ message: "Driver deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addDriver,
    getAll,
    update, 
    remove
}