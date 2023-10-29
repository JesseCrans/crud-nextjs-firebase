import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

const Todo = ({
  todo,
  todoId,
  changeTodoStatus,
  deleteTodo,
  editTodo,
  editingTodo,
  newTodo,
  setNewTodo
}: {
  todo: { name: string, completed: boolean },
  todoId: string,
  changeTodoStatus: (e: any, todoId: string) => void,
  deleteTodo: (todoId: string) => void,
  editTodo: (todoId: string) => void,
  editingTodo: string,
  newTodo: string,
  setNewTodo: (newTodo: string) => void
}) => {
  return (
    <li
      key={todoId}
      className="flex justify-between items-center mb-2"
    >
      {
        !(editingTodo == todoId) ? (
          <label
            className="bg-gray-200 p-4 rounded-md flex justify-between items-center break-all w-full"
          >
            {todo.name}
            <div>
              <input
                type="checkbox"
                className="mx-2"
                checked={todo.completed}
                onChange={(e) => changeTodoStatus(e, todoId)}
              />
            </div>
          </label>
        ) : (
          <label
            className="bg-gray-200 p-2 rounded-md text-left flex justify-between items-center w-full"
          >
            <input
              type="text"
              className="rounded-sm p-2"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder={todo.name}
            />
            <div>
              <input
                type="checkbox"
                className="mx-4"
                checked={todo.completed}
                onChange={(e) => changeTodoStatus(e, todoId)}
              />
            </div>
          </label>
        )
      }
      <div
        className="ml-6 mr-2 flex justify-between gap-4"
      >
        <button
          onClick={() => editTodo(todoId)}
        >
          <FontAwesomeIcon
            icon={faPencil}
            className="text-gray-400 hover:text-gray-500"
          />
        </button>
        <button
          onClick={() => deleteTodo(todoId)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 hover:text-red-700"
          />
        </button>
      </div>
    </li>
  )
}

export default Todo