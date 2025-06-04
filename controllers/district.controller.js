const { sendErrorResponse } = require("../helpers/send_error_res");
const District = require("../models/district.model");
const Region = require("../models/region.model");

const addDistrict = async (req, res) => {
    try {
        const { name, regionId } = req.body;

        if (!name || !regionId) {
            return res.status(400).send({ message: "Name and regionId are required" });
        }

        const result = await District.create({ name, regionId });
        res.status(201).send({ message: "District created successfully", result });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};


const getAll = async (req, res) => {
    try {
        const result = await District.findAll({
            include: [{
                model: Region,
                attributes: ['id', 'name']
            }]
        });

        res.status(200).send({ message: "Districts fetched successfully", result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, regionId } = req.body;

        const result = await District.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "District not found" });
        }

        if (name) result.name = name;
        if (regionId) result.regionId = regionId;
        await result.save();

        res.status(200).send({ message: "District updated successfully", result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await District.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "District not found" });
        }

        await result.destroy();
        res.status(200).send({ message: "District deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addDistrict,
    getAll,
    update,
    remove
};
