import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoListTitle = ({
  editingListName,
  newListName,
  setNewListName,
  viewingListName,
  editListName,
  deleteTodoList
}: {
  editingListName: boolean,
  newListName: string,
  setNewListName: React.Dispatch<React.SetStateAction<string>>,
  viewingListName: string,
  editListName: () => void,
  deleteTodoList: () => void
}) => {
  return (
    <div className="p-2 bg-gray-200 m-0 rounded-t-md flex justify-between">
      {
        editingListName ? (
          <input
            type="text"
            className="text-xl rounded-md p-2"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder={viewingListName}
          />
        ) : (
          <h2
            className="text-xl break-all m-2"
          >
            {viewingListName}
          </h2>
        )
      }
      <div className="flex justify-between gap-4 ml-4">
        <button
          onClick={editListName}
        >
          <FontAwesomeIcon
            icon={faPencil}
            className="text-gray-400 hover:text-gray-500"
          />
        </button>
        <button
          onClick={deleteTodoList}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 hover:text-red-700 mr-2"
          />
        </button>
      </div>
    </div>
  )
}

export default TodoListTitle