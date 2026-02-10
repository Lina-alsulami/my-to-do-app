import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import TaskItem from './components/TaskItem';

function App() {
  const [tasks, setTasks] = useState([]);

  
  const API_URL = 'https://my-todo-api-6owe.onrender.com/tasks';

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const handleAdd = async (title, description) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const handleDelete = async (id) => {
    // نستخدم الرابط الجديد هنا أيضاً
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleUpdate = async (id, currentStatus) => {
    // نستخدم الرابط الجديد هنا أيضاً
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentStatus })
    });
    fetchTasks(); 
  };

  return (
    <div style={styles.screenCenter}>
      <div style={styles.card}>
        <h2 style={styles.title}>To-Do List</h2>
        <AddTask onAdd={handleAdd} />
        <div style={{ marginTop: '20px' }}>
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={handleDelete} 
              onUpdate={handleUpdate} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  screenCenter: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', width: '100vw', backgroundColor: '#f0f2f5', margin: 0
  },
  card: {
    width: '100%', maxWidth: '450px', padding: '30px',
    backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  title: { textAlign: 'center', marginBottom: '25px', color: '#1a3a5f' }
};

export default App;