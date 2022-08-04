import './App.css';
import React from 'react';
import { ReactComponent as Cross } from './Assets/icon-cross.svg';
import { ReactComponent as Check } from './Assets/icon-check.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [value, setValue] = React.useState('');
  const [option, setOption] = React.useState('all');
  const [tasks, setTasks] = React.useState(() => {
    if (window.localStorage.getItem('todolist')) {
      return JSON.parse(window.localStorage.getItem('todolist'));
    } else return null;
  });

  React.useEffect(() => {
    window.localStorage.setItem('todolist', JSON.stringify(tasks));
  }, [tasks]);

  function createTask(e) {
    e.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      content: value,
      active: true,
    };
    setTasks((tasks) => {
      if (tasks) {
        return [...tasks, newTask];
      } else return [newTask];
    });
    setValue('');
  }

  function updateTaskStatus(e) {
    const taskIndex = tasks.findIndex((tasks) => {
      return (
        tasks.id ===
        Number(e.currentTarget.parentElement.parentElement.dataset.taskid)
      );
    });
    const newTasksArray = [...tasks];
    newTasksArray[taskIndex].active = !newTasksArray[taskIndex].active;
    setTasks(newTasksArray);
  }

  function deleteTask(e) {
    const deletedTaskID = Number(e.currentTarget.parentElement.dataset.taskid);
    setTasks((tasks) => tasks.filter((task) => task.id !== deletedTaskID));
  }

  function clearCompleted() {
    setTasks((tasks) => {
      return tasks.filter((task) => task.active === true);
    });
  }

  function handleDragEnd(result) {
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }

  return (
    <div className="App">
      <header className="todo-header">
        <h1>Todo</h1>
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="todo-items"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks &&
                tasks.map((task, index) => {
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={
                            !task.active ? 'todo-item completed' : 'todo-item'
                          }
                          data-taskid={task.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="todo-item-wrapper">
                            <div className="check" onClick={updateTaskStatus}>
                              <Check />
                            </div>
                            <p>{task.content}</p>
                          </div>
                          <div className="cross" onClick={deleteTask}>
                            <Cross />
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

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

      <footer className="footer">
        <p>Drag and drop to reorder list</p>
      </footer>
    </div>
  );
}

export default App;
