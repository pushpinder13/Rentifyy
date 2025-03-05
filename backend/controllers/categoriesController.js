const db = require('../config/db');

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM Categories');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const [category] = await db.query('SELECT * FROM Categories WHERE id = ?', [id]);
        if (category.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [result] = await db.query('UPDATE Categories SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ id, name });
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};