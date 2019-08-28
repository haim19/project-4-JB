var express = require('express');
var router = express.Router();
var CustomerModel = require('../models/customers.model');
var ProductModel = require('../models/product.model');
var CategoryModel = require('../models/category.model');
var CartModel = require('../models/cart.model');
var CartProductModel = require('../models/cartProduct.model');
var OrderModel = require('../models/order.model');

router.post('/get_cart_product', function (req, res) {
  let products = [];
  let lastProduct = req.body.prodList[req.body.prodList.length - 1];
  req.body.prodList.forEach(prod => {
    ProductModel.findOne({ _id: prod }).then(data => {
      products.push(data);
      if (prod === lastProduct) {
        res.json(products);
      }
    })
  });
})

router.get('/logout', async function (req, res) {
  try {
    req.session.destroy();
    res.json({ msg: "destoyed" });
  }
  catch (error) {
    console.log(error);
  }
})

router.post('/cart', function (req, res) {
  cartModel = new CartModel({
    customer: req.body.customer,
    creationDate: new Date()
  })
  CartModel.findOne({ customer: req.body.customer }).then(data => {
    if (data) {
      res.json(data._id);
    }
    else {
      cartModel.save((err, doc) => {
        if (err) throw err;
        res.json(doc);
      })
    }
  })
})
router.post('/search_cart', function (req, res) {
  CartModel.findOne({ customer: req.body.customer }).then(data => {
    res.json(data);
  })
})
router.post('/search_order', function (req, res) {
  OrderModel.find({ customerId: req.body.customer }).then(data => {
    res.json(data);
  })
})

router.post('/search_user_products', function (req, res) {
  CartProductModel.find({ cartId: req.body.cartId }).then(data => {
    res.json(data);
  })
})
router.put('/cart_product', function (req, res) {

  CartProductModel.updateMany({ cartId: req.body.cartId },
    {
      $set: {
        cartId: req.body.cartId + '_LOCKED_' + req.body.generated
      }
    },
    {
      new: true
    },
    function (error, updatedDoc) {
      if (error) throw error;
      res.json(updatedDoc);
    }
  )
})
router.put('/cart', function (req, res) {

  CartModel.updateMany({ customer: req.body.customer },
    {
      $set: {
        customer: req.body.customer + '_LOCKED_' + req.body.generated
      }
    },
    {
      new: true
    },
    function (error, updatedDoc) {
      if (error) throw error;
      res.json(updatedDoc);
    }
  )
})

router.post('/cart_product', function (req, res) {
  cartProductModel = new CartProductModel({
    ProdId: req.body.ProdId,
    cartId: req.body.cartId,
    amount: req.body.amount,
    totalPrice: req.body.totalPrice

  })
  cartProductModel.save((err, doc) => {
    if (err) throw err;
    res.json(doc);

  })
})

router.get('/prelog', async (req, res) => {
  try {
    res.json(req.session);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/products', async (req, res) => {
  try {
    var data = await ProductModel.find();
    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/categories', async (req, res) => {
  try {
    var data = await CategoryModel.find();
    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
})



/* GET home page. */
router.post('/register', function (req, res, next) {

  customerModel = new CustomerModel({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    clientId: req.body.clientId,
    password: req.body.password,
    city: req.body.city,
    street: req.body.street,
    role: "user"

  })
  customerModel.save((err, doc) => {
    if (err) throw err;
    req.session.user = doc;
    res.json(doc);
  })
});

router.post('/login', async (req, res) => {

  let data = await CustomerModel.findOne({
    email: req.body.email,
    password: req.body.password
  })
  req.session.user = data;
  res.json(data);

})
router.delete('/product/:id', async (req, res) => {
  try {
    var deleted = await CartProductModel.remove({
      _id: req.params.id,
      cartId: req.query.cartId
    })
    await res.json(deleted);
  }
  catch (error) {
    console.log(error);
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    let deletedProduct = await CartProductModel.deleteMany({ cartId: req.params.id })
    let deletedCart = await CartModel.deleteOne({ _id: req.params.id })
    await res.json({ deletedProduct: deletedProduct, deletedCart: deletedCart });
  }
  catch (error) {
    console.log(error);
  }
})
router.post('/order', function (req, res) {
  orderModel = new OrderModel({
    customerId: req.body.customerId,
    cartId: req.body.cartId,
    finalPrice: req.body.finalPrice,
    scheduled: req.body.scheduled,
    city: req.body.city,
    street: req.body.street,
    generated: req.body.generated,
    card: req.body.card

  })
  orderModel.save((err, doc) => {
    if (err) throw err;
    res.json(doc);

  })
})


router.post('/checkid', async (req, res) => {

  let email = await CustomerModel.findOne({
    email: req.body.email
  })
  let id = await CustomerModel.findOne({
    clientId: req.body.clientId
  })
  if (!id && !email) {
    res.json(id);
  }
  if (id) {
    res.json("ID already exists");
  }
  if (email) {
    res.json({ msg: "email already exists" });
  }
})

router.put('/product', function (req, res) {

  ProductModel.findByIdAndUpdate({ _id:req.body.prodId },
    {
      $set: {
        title:req.body.title,
        url:req.body.url,
        price:req.body.price,
        categoryType:req.body.categoryType
      }
    },
    {
      new: true
    },
    function (error, updatedDoc) {
      if (error) throw error;
      res.json(updatedDoc);
    }
  )
})

module.exports = router;
