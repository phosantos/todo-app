import './App.css';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TodoHeader from './Components/TodoHeader';
import TodoTasks from './Components/TodoTasks';
import TodoOptions from './Components/TodoOptions';

function App() {
  const [lightTheme, setLightTheme] = React.useState(false);
  const [option, setOption] = React.useState('all');
  const [tasks, setTasks] = React.useState(() => {
    if (window.localStorage.getItem('todolist')) {
      return JSON.parse(window.localStorage.getItem('todolist'));
    } else return [];
  });

  React.useEffect(() => {
    if (window.localStorage.getItem('theme') === 'light-theme') {
      setLightTheme(true);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      'theme',
      lightTheme ? 'light-theme' : 'dark-theme',
    );
  }, [lightTheme]);

  React.useEffect(() => {
    window.localStorage.setItem('todolist', JSON.stringify(tasks));
  }, [tasks]);

  function handleDragEnd(result) {
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }

  return (
    <div className="App">
      <div className="container">
        <TodoHeader
          setTasks={setTasks}
          lightTheme={lightTheme}
          setLightTheme={setLightTheme}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoTasks tasks={tasks} setTasks={setTasks} option={option} />
        </DragDropContext>
        <TodoOptions
          tasks={tasks}
          setTasks={setTasks}
          option={option}
          setOption={setOption}
        />

        <footer className="footer">
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
