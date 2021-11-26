const User = require("./orderModel")

module.exports.createOrder = async (req, res) => {
    console.log(req.body)
    let newOrder = {
        userId: req.body.userId,
        products: req.body.products
    }
   
}

module.exports.getOrderByUserId = async (req, res) => {
    let userId = req.params.userId
    console.log(userId)
    let user = await User.findOne({ "_id": userId })
   
}

module.exports.getAllOrder = async (req, res) => {
    console.log(1)
    
}