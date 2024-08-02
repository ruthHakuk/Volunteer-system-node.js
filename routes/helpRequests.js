const express = require('express');
const router = express.Router();

const controller = require('../controllers-bl/HelpRequestsController')

// router.get('/', async (req, res, next) => {
//     try {
//         const result = await controller.getAll(req.query);
//         res.json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// })


router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query);
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('There is problem')) {
            res.status(404).send(`Could not filter the Requests: ${error.message}`);
        }
        else {
            next(error);
        }
    }
})



router.put('/:volunteerId', async (req, res, next) => {
    try {
        let result = await controller.update(req.params.volunteerId, req.body);
        res.status(200).send(result);
    } catch (error) {
        if (error.message == 'Could not update volunteer, volunteer not found') {
            res.status(404).send(`Could not update volunteer request: ${error.message}`);
        }
        else if (error.message == 'Could not update volunteer request, request not found') {
            res.status(404).send(`Could not update volunteer request: ${error.message}`);
        } else {
            next(error);
        }
    }
});

module.exports = router;
