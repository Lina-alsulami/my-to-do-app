const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

const cors = require('cors');
app.use(cors()); 

app.use(express.json());


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
});

app.post('/tasks', async (req, res) => {
    const newTask = await Task.create({
         title: req.body.title,
         description: req.body.description,
        
    });
    res.json(newTask);
});

app.get('/tasks', async (req, res) => {
    const task = await Task.findAll();
    res.json(task);
});
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        
        const taskToDelete = await Task.findByPk(req.params.id);

        if (!taskToDelete) {
            return res.status(404).json({ 
                error: "Delete failed", 
                message: "Task not found" 
            });
        }

        await Task.destroy({
            where: { id: req.params.id }
        });

        res.json({
            message: "Task deleted successfully",
            deletedData: taskToDelete
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        
        const [updatedRows] = await Task.update(
            { completed: req.body.completed },
            { where: { id: req.params.id } }
        );
        
        if (updatedRows === 0) {
            return res.status(404).json({ 
                error: "Update failed", 
                message: "Task not found" 
            });
        }

        const updatedTask = await Task.findByPk(req.params.id);
        res.json({
            message: "Task updated successfully",
            data: updatedTask
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
sequelize.sync().then(() => {
    console.log("Database connected and table created!");
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

