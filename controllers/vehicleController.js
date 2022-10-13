const { User, Vehicle, MyVehicle } = require('../models/index');

class VehicleController {
    static async getList(req,res,next){
        try{
            const perPage = 5
            const page = req.query.page || 1
            const search = req.query.search || null
            let data;
            if(search){
                data = await Vehicle.findAll({where: {capacity: search}})
            }else{
                data = await Vehicle.findAll()
            }
            const end = page * perPage
            let start = (page - 1) * perPage
            let fixedData = []
            while(start < end){
                fixedData.push(data[start])
                start = start + 1
                if(!data[start]){
                    break
                }
            }
            res.status(200).json(fixedData)
        }catch(err){
            next(err)
        }
    }
    static async getMyVehicle(req,res, next){
        try{
            const UserId = req.user.id
            const data = await MyVehicle.findAll({where: 
                { UserId }, 
                include: {
                    model: Vehicle
                }
            })
            res.status(200).json(data)
        }catch(err){
            next(err)
        }
    }
    static async addMyVehicle(req,res,next){
        try{
            const UserId = req.user.id
            const VehicleId = req.params.vId
            const data = await MyVehicle.create({UserId, VehicleId})
            res.status(201).json({id: data.id, UserId: data.UserId, VehicleId: data.VehicleId})
        }catch(err){
            next(err)
        }
    }
    static async patchMyVehicle(req,res,next){
        try{
            const UserId = req.user.id
            const id = req.params.id
            const data = await MyVehicle.findOne({where: {id}})
            if(!data){
                throw {name: 'Not found!'}
            }
            if(UserId !== data.UserId){
                throw {name: 'Forbidden !'}
            }
            await MyVehicle.update(
                {status : 'Paid'},
                {where: {id}}
            )
            res.status(201).json({message: 'successfully paid!'})
        }catch(err){
            next(err)
        }
    }
    static async deleteMyVehicle(req,res,next){
        try{
            const id = req.params.id
            const UserId = req.user.id
            const data = await MyVehicle.findOne({where: {id}})
            if(!data){
                throw {name: 'Not found!'}
            }
            if(UserId !== data.UserId){
                throw {name: 'Forbidden !'}
            }
            await MyVehicle.destroy({where: {id}})
            res.status(200).json({message: "Item removed !"})
        }catch(err){
            next(err)
        }
    }
    static async myVehicleDetail(req,res,next){
        try{
            const id = req.params.id
            const data = await MyVehicle.findOne({where: {id}, include: Vehicle})
            if(!data){
                throw {name: 'Not found!'}
            }
            res.status(200).json(data)
        }catch(err){
            next(err)
        }
    }
}

module.exports = VehicleController