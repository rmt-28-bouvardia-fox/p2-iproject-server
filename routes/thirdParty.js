const tPApi = require('express').Router()
const ThirdApiController = require('../controllers/thirdApiController')


tPApi.get('/verify', ThirdApiController.verifyEmail)

module.exports = tPApi