
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = 5000;

app.use(cors());

mongoose.connect('mongodb+srv://SajnaTT:Saju123naufal@cluster0.sut9o9a.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const TodoSchema = new mongoose.Schema({
  description: String,
  status: String,
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use(express.json());

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { description, status } = req.body;
  const newTodo = new Todo({
    description,
    status,
  });
  await newTodo.save();
  res.send('Todo added successfully');
});

app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Todo.findByIdAndUpdate(id, { status });
  res.send('Todo status updated successfully');
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.send('Todo deleted successfully');
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
