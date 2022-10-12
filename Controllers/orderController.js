const {Order, User} = require('../models')
const midtransClient = require('midtrans-client')
const serverKey = process.env.SERVER_KEY

class OrderController {

    static async getOrders(req,res,next){
        try {
            const userOrders = await User.findOne({where : {id : req.user.id}, include : Order})
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

    static async order(){
        const {orderId , gross_amount } = req.body

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : serverKey
        });
        let parameter = {
            "transaction_details": {
                "order_id": "YOUR-ORDERID-123456",
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                console.log('transactionToken:',transactionToken);
            })
            .err((error) =>{
                conesole.log(error)
            })
    }
}

module.exports = OrderController