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

module.exports = router;