const VehicleController = require('../controllers/vehicleController')
const vRoutes = require('express').Router()

vRoutes.get('/vehicles', VehicleController.getList)
vRoutes.get('/myvehicles', VehicleController.getMyVehicle)
vRoutes.get('/myvehicles/:id', VehicleController.myVehicleDetail)
vRoutes.post('/myvehicles/:vId', VehicleController.addMyVehicle)
vRoutes.patch('/myvehicles/:id', VehicleController.patchMyVehicle)
vRoutes.delete('/myvehicles/:id', VehicleController.deleteMyVehicle)

module.exports = vRoutes