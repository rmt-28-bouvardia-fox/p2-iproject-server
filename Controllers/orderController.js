const {Order, User} = require('../models')
const midtransClient = require('midtrans-client')
const serverKey = process.env.SERVER_KEY

class OrderController {

    static async getOrders(req,res,next){
        try {
            const userOrders = await User.findOne({where : {id : req.user.id}, include : [{ model : Order}], order : [[Order, 'createdAt', 'desc']]})
            res.status(200).json(userOrders)
        } catch (error) {
            next(error)
        }
    }

    static async getCart(req,res,next){
        try {
            const UserId = req.user.id

            const cart = await Order.findAll({where : {UserId, status : 'unpaid'}})
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }

    static async addToCart(req,res,next){
        try {
            const {comicId, comicName, comicImageUrl, price} = req.body
            const orderNumber = new Date().getTime() + '_' + req.user.username
            
            const UserId = req.user.id
            const status = 'unpaid'

            const added = await Order.create({orderNumber, status,comicId, comicName, comicImageUrl, UserId, price : price * 15500})

            res.status(201).json({added})
        } catch (error) {
            next(error)
        }
    }

    static async order(req,res,next){
        const { gross_amount } = req.query
        const user = await User.findByPk(req.user.id)

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : serverKey
        });
        const order_id = new Date().getTime()
        const cart = await Order.findAll({where : {UserId : req.user.id}})
        const id = cart.map(el => {
            return el.id
        })
        await Order.update({order_id : order_id}, {where : {id : id}})
        
        let parameter = {
            "transaction_details": {
                "order_id": order_id,
                "gross_amount": +gross_amount
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": user.firstName,
                "last_name": user.lastName,
                "email": user.email ? user.email : 'empty@mail.com',
                "phone": user.phone ? user.phone : '082177706090'
            }
        };

        snap.createTransaction(parameter)
            .then((transaction)=>{
                let transactionToken = transaction.token;
                res.status(201).json({transactionToken})
            })
            .catch((error) =>{
                next(error)
            })
    }

    static async updateStatus(req,res,next){
        try {
            const {order_id} = req.body
            await Order.update({status : 'paid'}, {where : {order_id}})

            res.status(200).json({message : 'success paid'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderController