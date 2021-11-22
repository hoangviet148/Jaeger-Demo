const client = require("../grpc-client/Order/client")
const User = require("../models/userModel")

module.exports.createOrder = async (req, res) => {
    console.log(req.body)
    let newOrder = {
        userId: req.body.userId,
        products: req.body.products
    }
    client.createOrder(newOrder, (error, order) => {
        if (!error) {
            return res.status(201).json({ message: "Order create success!", order: order })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}

module.exports.getOrderByUserId = async (req, res) => {
    let userId = req.params.userId
    console.log(userId)
    let user = await User.findOne({ "_id": userId })
    client.getOrderByUserId({ id: userId }, (error, order) => {
        if (!error) {
            return res.status(200).json({
                orderId: order._id,
                username: user.name,
                products: order
            })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}

module.exports.getAllOrder = async (req, res) => {
    console.log(1)
    client.getAllOrder({}, (error, orders) => {
        if (!error) {
            return res.status(201).json({ orders })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}