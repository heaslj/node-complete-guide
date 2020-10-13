const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                requred: true
            },
            quantity: {
                type: Number,
                requred: true
            }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
