const express = require('express');
const { AppointmentController } = require('@controllers');
const { AppointmentValidation } = require('@validations');
const router = express.Router();

router.post('/', AppointmentValidation.create, AppointmentController.create);

router.get('/', AppointmentValidation.update, AppointmentController.getAll);

router.get('/:id', AppointmentController.getById);

router.put('/:id', AppointmentValidation.update, AppointmentController.update);

router.delete('/:id', AppointmentController.delete);

router.get('/owner/:pet_owner_id', AppointmentController.getByPetOwner);

router.get('/doctor/:doctor_id', AppointmentController.getByDoctor);

router.get('/status/:status', AppointmentController.getByStatus);

router.get('/details', AppointmentController.getDetailsWithPetsAndDoctors);

router.post('/check-conflict', AppointmentController.checkAppointmentConflict);

module.exports = router;
