const { sendErrorResponse } = require("../helpers/send_error_res")
const Driver = require("../models/drivers.model")
const BusDriver = require("../models/bus-driver.model")
const Buses = require("../models/buses.model")

const addBusDriver = async (req, res) => {
    try {
        const {driverId, busId} = req.body

    
        const result = await BusDriver.create({driverId, busId})
        res.status(201).send({message: "Created", result})
    } catch (error) {
        sendErrorResponse(error, res, 400)
    }
}

const getAll = async (req, res) => {
    try {
        const result = await BusDriver.findAll({
            include: [
                { model: Driver }
            ]
        });

        res.status(200).send({ message: "Successful", result });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { number_plate, seat_count, model, driver_id } = req.body;

        const bus = await Buses.findByPk(id);
        if (!bus) {
            return res.status(404).send({ message: "Bus not found" });
        }

        bus.number_plate = number_plate || bus.number_plate;
        bus.seat_count = seat_count || bus.seat_count;
        bus.model = model || bus.model;
        bus.driver_id = driver_id || bus.driver_id;

        await bus.save();

        res.status(200).send({ message: "Bus updated successfully", result: bus });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

const remove = async (req, res) => {
     try {
        const { id } = req.params;

        const result = await BusDriver.findByPk(id);
        if (!result) {
            return res.status(404).send({ message: "Assignment not found" });
        }

        await result.destroy();

        res.status(200).send({ message: "Assignment deleted successfully" });
    } catch (error) {
        sendErrorResponse(error, res, 400);
    }
};

module.exports = {
    addBusDriver,
    getAll,
    update, 
    remove
}