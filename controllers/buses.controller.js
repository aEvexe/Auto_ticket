const { sendErrorResponse } = require("../helpers/send_error_res");
const Buses = require("../models/buses.model");
const Driver = require("../models/drivers.model");

const addBuses = async (req, res) => {
    try {
        const { number_plate, seat_count, model} = req.body;

        if (!number_plate) {
            return res.status(400).send({ message: "Number plate is required" });
        }

        const result = await Buses.create({ number_plate, seat_count,  model});
        res.status(201).send({ message: "Buses created successfully", result });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};


const getAll = async (req, res) => {
    try {
        const result = await Buses.findAll({
            include: [{
                model: Driver,
                attributes: ['id', 'name']
            }]
        });

        res.status(200).send({ message: "Buses fetched successfully", result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { number_plate, seat_count, model } = req.body;

        const result = await Buses.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Bus not found" });
        }

        if (number_plate) result.number_plate = number_plate;
        if (seat_count) result.seat_count = seat_count;
        if (model) result.model = model;

        await result.save();

        res.status(200).send({ message: "Bus updated successfully", result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Buses.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Bus not found" });
        }

        await result.destroy();
        res.status(200).send({ message: "Bus deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addBuses,
    getAll,
    update,
    remove
};
