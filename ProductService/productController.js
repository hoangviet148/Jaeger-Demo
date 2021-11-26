module.exports.createProduct = async (req, res) => {
    let newProduct = {
        name: req.body.name
    }
   
}

module.exports.getProductById = async (req, res) => {
    productId = req.params.productId
    console.log(productId)
    
}

module.exports.getAllProduct = async (req, res) => {
    console.log(1)
   
}