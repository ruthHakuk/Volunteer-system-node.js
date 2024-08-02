const express = require('express');
const router = express.Router();

const controller = require('../controllers-bl/VolunteersController')


router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        if (error.message == 'invalid new Volunteer id') {
            res.status(400).send(`volunteer with id ${req.body.id} already exist`)
        }
        else next(error);
    }
});



module.exports = router;
