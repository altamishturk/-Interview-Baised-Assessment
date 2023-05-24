import React, { useState } from 'react';

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input type="text" value={task} onChange={handleTaskChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
