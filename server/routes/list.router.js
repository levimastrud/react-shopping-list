const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM list ORDER BY "is-purchased" DESC, "item" DESC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.send('error server side GET', error);
        });
});

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

module.exports = router;