import React from 'react';

const TodoOptions = ({ tasks, setTasks, option, setOption }) => {
  function clearCompleted() {
    setTasks((tasks) => {
      return tasks.filter((task) => task.active === true);
    });
  }

  return (
    <ul className="todo-options">
      <li className="items-left">
        {tasks.reduce((acc, task) => {
          if (task.active) acc++;
          return acc;
        }, 0)}{' '}
        items left
      </li>
      <div>
        <li
          className={option === 'all' ? 'active' : ''}
          onClick={() => setOption('all')}
        >
          All
        </li>
        <li
          className={option === 'active' ? 'active' : ''}
          onClick={() => setOption('active')}
        >
          Active
        </li>
        <li
          className={option === 'completed' ? 'active' : ''}
          onClick={() => setOption('completed')}
        >
          Completed
        </li>
      </div>
      <li onClick={clearCompleted}>Clear Completed</li>
    </ul>
  );
};

export default TodoOptions;
