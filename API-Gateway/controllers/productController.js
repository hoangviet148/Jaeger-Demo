const client = require("../grpc-client/Product/client")

module.exports.createProduct = async (req, res) => {
    let newProduct = {
        name: req.body.name
    }
    client.createProduct(newProduct, (error, product) => {
        if (!error) {
            return res.status(201).json({ message: "Product create success!", product: product })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}

module.exports.getProductById = async (req, res) => {
    productId = req.params.productId
    console.log(productId)
    client.getProductById({id: productId}, (error, product) => {
        if (!error) {
            return res.status(200).json({ product: product })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}

module.exports.getAllProduct = async (req, res) => {
    console.log(1)
    client.getAllProduct({}, (error, products) => {
        if (!error) {
            return res.status(201).json({ products: products })
        } else {
            console.log(error + " ");
            return res.status(400).json(error + " ")
        }
    })
}