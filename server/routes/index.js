var express = require('express');
var router = express.Router();
var CustomerModel = require('../models/customers.model');
var ProductModel = require('../models/product.model');
var CategoryModel = require('../models/category.model');



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


module.exports = router;
