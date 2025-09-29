import React from 'react';
import './MyTasks.css';

const MyTasks = () => {
  // Mock data for tasks
  const tasks = [
    { id: 1, title: 'Complete performance review form', dueDate: '2023-11-05', priority: 'High', completed: false },
    { id: 2, title: 'Submit quarterly expenses', dueDate: '2023-10-31', priority: 'High', completed: true },
    { id: 3, title: 'Review Q4 project plan', dueDate: '2023-11-10', priority: 'Medium', completed: false },
    { id: 4, title: 'Update client contact list', dueDate: '2023-11-15', priority: 'Low', completed: false },
  ];

  return (
    <div className="tasks-container">
      <h2><header>My Tasks</header></h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-details">
              <span className="task-title">{task.title}</span>
              <span className="task-due-date">Due: {task.dueDate}</span>
            </div>
            <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;