const Controller = require("./Controller");
const HelpRequestsServices = require('../services-dal/HelpRequestsServices')

class HelpRequestsController extends Controller {
    constructor() {
        super(HelpRequestsServices)
    }
}

let helpRequestsController = new HelpRequestsController();
module.exports = helpRequestsController