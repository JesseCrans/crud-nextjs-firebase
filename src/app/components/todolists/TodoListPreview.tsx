import React from 'react'
import { TodoList, Todo } from '@/app/page';

const TodoListPreview = ({
  todoListName,
  todoListTodos
}: {
  todoListName: string,
  todoListTodos: { [key: string]: { name: string, completed: boolean } }
}) => {
  const todoListTodosArray = Object.entries(todoListTodos || {});
  return (
    <li
      className="bg-gray-100 p-4 rounded-md hover:bg-gray-200"
    >
      <h3
        className="text-xl font-semibold border-b-white border-b-2 pb-2 mb-2 break-all"
      >
        {todoListName}
      </h3>
      {
        todoListTodos ? (
          <ul
            className="list-disc list-inside"
          >
            {
              todoListTodosArray.slice(0, 5).map(([todoId, todo]) => (
                <li
                  key={todoId}
                >
                  {todo.name}
                </li>
              ))
            }
            {
              todoListTodosArray.length > 5 && (
                <li>
                  ...
                </li>
              )
            }
          </ul>
        ) : (
          <p>No todos yet.</p>
        )
      }
    </li>
  )
}

export default TodoListPreview