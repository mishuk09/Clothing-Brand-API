const express = require('express');
const router = express.Router();
const Order = require('../../Schema/Order'); // Adjust the path as needed

// Controller function for creating an order
const createOrder = async (req, res) => {
    try {        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Define the route for creating an order
router.post('/orders', createOrder);

module.exports = router;
