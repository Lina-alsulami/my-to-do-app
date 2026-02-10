import { useState } from 'react';

function AddTask({ onAdd }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd(title, desc);
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} 
      />
      <input 
        placeholder="Description" 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} 
      />
      <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
}

export default AddTask;