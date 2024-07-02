const express = require('express');
const router = express.Router();
const con = require("../../config/db");
var moment = require("moment");

// Get all products
router.get('/getAllproducts', (req, res) => {
    con.query('SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


router.get('/categories_type', (req, res) => {
    con.query('SELECT * FROM categories', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/getSearch', (req, res) => {
    const { searchQuery } = req.query; // Assuming the search query parameter is named 'searchQuery'
    
    console.log(`searchQuery`, searchQuery);
    let sqlQuery = 'SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id';
    const params = [];
    

    if (searchQuery) {
        sqlQuery += ' WHERE p.name LIKE ?';
        params.push('%' + searchQuery + '%');
    }

    con.query(sqlQuery, params, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});




// addcart by users
router.post('/add_cart', (req, res) => {
    const { user_id, product_id, quantity, totalByProduct } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    con.query('INSERT INTO cart_items (user_id, product_id, quantity,totalByProduct) VALUES (?, ?, ?, ?)', [user_id, product_id, quantity, totalByProduct], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to add item to cart.' });
        }
        console.log(results);
        res.json({ message: 'Item added to cart.' });
    });
});

// get cartby users
router.get('/cart_items/:user_id', (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const query = `
    SELECT 
    ci.id AS cart_item_id, 
    ci.user_id AS cart_user_id,
    ci.product_id AS cart_product_id,
    ci.quantity AS cart_item_quantity,   
    ci.totalByProduct AS cart_item_totalByProduct, 
    p.*, 
    c.name AS category_name,
    c.replacement_days AS category_replacement_days,
    c.replacement_description AS category_replacement_description

    FROM 
    cart_items ci 
    JOIN 
    products p ON ci.product_id = p.id 
    JOIN 
    categories c ON p.category_id = c.id 
    WHERE 
    ci.user_id = ?`;

    con.query(query, userId, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to fetch cart items.' });
        }
        res.json(results);
    });
});


// grouping all quantity/totalamt by userid
router.get('/subTotal_byUser/:user_id', (req, res) => {
    const userId = req.params.user_id;
    con.query('SELECT user_id, SUM(totalByProduct) AS subTotalAmount, SUM(quantity) AS subTotalQuantity FROM mobileapp.cart_items WHERE user_id = ? GROUP BY user_id', [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(...result);
        // console.log(...result,"resss");
    });
});

// update cartquantity by user
router.put('/add_quantity/:id', (req, res) => {
    const cartItemId = req.params.id;
    const { quantity, totalByProduct } = req.body;

    if (!cartItemId || !quantity || isNaN(quantity) || !totalByProduct) {
        return res.status(400).json({ message: 'Invalid request body.' });
    }
    con.query('UPDATE cart_items SET quantity = quantity + 1, totalByProduct = ? WHERE id = ?', [totalByProduct, cartItemId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to add quantity to cart item.' });
        }
        res.json({ message: 'Quantity added successfully.' });
    });
});

// update cartquantity by user

router.put('/remove_quantity/:id', (req, res) => {
    const cartItemId = req.params.id;
    const { quantity, totalByProduct } = req.body;

    if (!cartItemId || !quantity || isNaN(quantity) || !totalByProduct) {
        return res.status(400).json({ message: 'Invalid request body.' });
    }

    con.query('UPDATE cart_items SET quantity = quantity - 1, totalByProduct =  ? WHERE id = ?', [totalByProduct, cartItemId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to remove quantity from cart item.' });
        }
        res.json({ message: 'Quantity removed successfully.' });
    });
});

// delete cartby user

router.delete('/remove_Cart/:id', (req, res) => {
    const cartItemId = req.params.id;
    console.log(cartItemId,"cartItemId");

    if (!cartItemId) {
        return res.status(400).json({ message: "Invalid request" });
    }

    con.query('DELETE FROM cart_items WHERE id = ?', [cartItemId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to remove cart item.' });
        }
        res.status(200).json({ message: 'Cart item removed successfully.' });
    });
});


module.exports = router;




module.exports = router;
