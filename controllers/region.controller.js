const { sendErrorResponse } = require("../helpers/send_error_res")
const Region = require("../models/region.model")

const addRegion = async (req, res) => {
    try {
        const {name} = req.body
    
        const result = await Region.create({name})
        res.status(201).send({message: "Created", result})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAll = async (req, res) => {
    try {
        const result = await Region.findAll({})

        res.status(200).send({message: "Successfull", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await Region.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Region not found" });
        }

        result.name = name || result.name;
        await result.save();

        res.status(200).send({ message: "Region updated successfully", result: result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Region.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Region not found" });
        }

        await result.destroy();

        res.status(200).send({ message: "Region deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addRegion,
    getAll,
    update, 
    remove
}