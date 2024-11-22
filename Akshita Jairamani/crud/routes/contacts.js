const express = require('express');
const db = require('../db');

const router = express.Router();

// Display all contacts
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM contacts');
        res.render('index', { contacts: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// Add new contact
router.post('/add', async (req, res) => {
    const { name, email, contact } = req.body;
    try {
        await db.query('INSERT INTO contacts (name, email, contact) VALUES (?, ?, ?)', [name, email, contact]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// Delete contact
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM contacts WHERE id = ?', [id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// Edit contact
// Show the edit form
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.render('edit', { contact: rows[0] });
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});

// Handle the form submission for updating
router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, contact } = req.body;
    try {
        await db.query(
            'UPDATE contacts SET name = ?, email = ?, contact = ? WHERE id = ?',
            [name, email, contact, id]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});



module.exports = router;
