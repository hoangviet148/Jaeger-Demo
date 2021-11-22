const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    password: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
});

module.exports = mongoose.model("Order", orderSchema);