import React from 'react';
import { ReactComponent as Moon } from '../Assets/icon-moon.svg';
import { ReactComponent as Sun } from '../Assets/icon-sun.svg';

const TodoHeader = ({ setTasks, lightTheme, setLightTheme }) => {
  const [value, setValue] = React.useState('');

  function createTask(e) {
    e.preventDefault();
    if (!value) return;
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      content: value,
      active: true,
    };
    setTasks((tasks) => [...tasks, newTask]);
    setValue('');
  }

  function changeTheme() {
    setLightTheme(!lightTheme);
    document.documentElement.classList.toggle('light-theme');
  }

  return (
    <header className="todo-header">
      <div>
        <h1>Todo</h1>
        <div onClick={changeTheme} className="todo-header-theme-button">
          {lightTheme ? <Moon /> : <Sun />}
        </div>
      </div>
      <form onSubmit={createTask}>
        <div className="check"></div>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
