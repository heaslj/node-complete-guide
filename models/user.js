const mongoose = require('mongoose');
const Order = require('./order');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.addOrder = function () {
  const products = this.cart.items;
  const orderItems = products.map(prod => {
    console.log('Mapping prods to order; prod id is: ', prod.productId);
    return item = {
      productId: prod.productId,
      quantity: prod.quantity
    }
  })
  const order = new Order(
    {
      items: orderItems,
      userId: {
        _id: this._id
      }
    });
  return order.save()
    .then(result => {
      this.cart = { items: [] };
      return this.save();
    });
}

  // getOrders() {
  //   return db
  //     .collection('orders')
  //     .find({ 'user._id': new ObjectId(this._id) })
  //     .toArray();
  // }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   // Pruning a cart of deleted products seemed simple, but got complicated quickly:
//   //   - How/when to update the database with the pruned cart?
//   //   - How avoid duplicating products lookup code?
//   //   - How fit all that in with all the promise-based code?
//   // doesn't work right now with the code that's been commented out
//   validateCart() {
//     // initialize an undefined cart
//     if(!this.cart){
//       this.cart = {items: []};
//     }
//   //   } else {
//   //     // remove any items from the cart that have been deleted from the shop
//   //     const productIds = this.cart.items.map(i => {
//   //       return i.productId;
//   //     });
//   //     if (productIds.length != products.length) {
//   //       this.cart.items.filter(i => {
//   //         return 0 <= products.findIndex(p => {
//   //           return p._id.toString() === i.productId.toString();
//   //         })
//   //       });
//   //     }
//   //     // persist the updated cart
//   //     db
//   //       .collection('users')
//   //       .updateOne(
//   //         { _id: new ObjectId(this._id) },
//   //         { $set: { cart: { items: this.cart.items } } }
//   //       );
//   //   }
//   }
// }

module.exports = mongoose.model('User', userSchema);
