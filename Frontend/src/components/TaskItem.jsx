function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', gap: '10px' }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ 
          margin: 0, 
          textDecoration: task.completed ? 'line-through' : 'none', 
          color: task.completed ? '#aaa' : '#000' 
        }}>
          {task.title}
        </h4>
        <p style={{ margin: 0, fontSize: '0.85em', color: '#666' }}>{task.description}</p>
      </div>
      
      <button 
        onClick={() => onUpdate(task.id, task.completed)} 
        style={{ 
          background: task.completed ? '#6c757d' : '#007bff', 
          color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' 
        }}
      >
        {task.completed ? 'Undo' : 'Done'}
      </button>

      <button 
        onClick={() => onDelete(task.id)} 
        style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;