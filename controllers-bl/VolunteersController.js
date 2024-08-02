const Controller = require("./Controller");
const VolunteersServices = require('../services-dal/VolunteersServices')

class VolunteersController extends Controller {
    constructor() {
        super(VolunteersServices)
    }
}

let volunteersController = new VolunteersController();
module.exports = volunteersController