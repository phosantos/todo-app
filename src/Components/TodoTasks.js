import React from 'react';
import { ReactComponent as Cross } from '../Assets/icon-cross.svg';
import { ReactComponent as Check } from '../Assets/icon-check.svg';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TodoTasks = ({ tasks, setTasks, option }) => {
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

  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul
          className="todo-items"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks
            .filter((task) => {
              if (option === 'active') return task.active === true;
              if (option === 'completed') return task.active === false;
              return task;
            })
            .map((task, index) => {
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
  );
};

export default TodoTasks;
