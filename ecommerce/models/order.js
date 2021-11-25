const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({

    product: { type: ObjectId, ref: "Product" },
    name: String,
    count: Number,
    price: Number

}, { timestamps: true })

const CartItem = mongoose.model("CartItem", CartSchema)

const OrderSchema = new mongoose.Schema({

    products: [CartSchema],
    ammount: { type: Number },
    status: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,

    address: { type: String },

    orderName: { type: String },

    phone: { type: Number },

    email: { type: String },

    user: { type: ObjectId, ref: "User" },

    paymentMethod: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    taxPrice: {
        type: Number

    }
}, { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };