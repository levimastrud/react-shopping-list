const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

// FETCH DATA

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM list ORDER BY "ispurchased" DESC, "item" DESC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.send('error server side GET', error);
        });
});

// ADD ITEM

router.post('/', (req, res) => {
    let newItem = req.body;
    const queryText = `INSERT INTO list ("item", "quantity", "unit") VALUES ($1, $2, $3);`
    pool.query(queryText, [newItem.item, newItem.quantity, newItem.unit])
        .then((result) => {
            res.sendStatus(201)
        }).catch((error) => {
            console.error('error server side POST', error)
        });
})

// DELETE BUTTON

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM "list" WHERE "id"=$1`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        res.sendStatus(204)
        console.log('PARAMS:', req.body);
    })
    .catch((error) => {
        console.log('error deleting', error);
        res.sendStatus(500)
    })
})

// CLEAR BUTTON

router.delete('/', (req, res) => {
    const queryText = 'DELETE FROM "list";';
    pool.query(queryText)
    .then(result => {
        res.sendStatus(204);
    }).catch(error => {
        res.sendStatus(500);
    })
});

// BUY AN ITEM

router.put('/:id', (req, res) => {
    const queryText ='UPDATE list SET "ispurchased" = NOT "ispurchased" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
    .then(result => {
        console.log(req.params)
        res.sendStatus(204)
    }).catch(error => {
        res.sendStatus(500)
    })
});

// RESET BUTTON

router.put('/', (req, res) => {
    const queryText ='UPDATE list SET "ispurchased" = false;';
    pool.query(queryText)
    .then(result => {
        console.log(req.params)
        res.sendStatus(204)
    }).catch(error => {
        res.sendStatus(500)
    })
});

module.exports = router;