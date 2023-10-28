"use client";
import PageLayout from "./Layouts/PageLayout";
import { useUser } from "./UserContext";
import { db } from "./firebase";
import { ref, push, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";

interface TodoList {
  name: string,
  todos: string[],
  id: string,
}

export default function Home() {
  const [todoLists, setTodoLists] = useState([] as TodoList[]);
  const [newListName, setNewListName] = useState('');
  const [addingNewList, setAddingNewList] = useState(false);
  const { user, userInfo } = useUser();

  useEffect(() => {
    const todoListsRef = ref(db, 'users/' + user.uid + '/todoLists');
    onValue(todoListsRef, (snapshot) => {
      const data = snapshot.val();
      const todoLists = [];
      for (let id in data) {
        todoLists.push({ id, ...data[id] });
      }
      setTodoLists(todoLists);
    });
  }, [user]);

  const addTodoList = async () => {
    if (addingNewList) {
      const name = newListName.trim();
      if (!name) {
        alert('Please enter a name for the todo list.');
        return
      }
      const todoListsRef = ref(db, 'users/' + user.uid + '/todoLists');
      const newTodoListRef = push(todoListsRef);
      set(newTodoListRef, {
        name: name,
        todos: [],
        id: newTodoListRef.key,
      })
      setAddingNewList(false);
    } else {
      setAddingNewList(true);
    }
  }

  return (
    <PageLayout>
      <h1>CRUD Application</h1>
      {
        !user.uid ? (
          <p>Please login to see your ToDo lists.</p>
        ) : (
          <>
            <p>Welcome {userInfo?.username}!</p>
            <h2>Your Todo Lists</h2>
            <ul className="flex flex-wrap gap-4 my-4">
              {
                todoLists.map((todoList) => (
                  <li
                    key={todoList.id}
                    className="bg-gray-100 p-4 rounded-md"
                  >
                    <h3
                      className="text-xl font-semibold border-b-white border-b-2 pb-2 mb-2"
                    >
                      {todoList.name}
                    </h3>
                    {
                      todoList.todos ? (
                        <ul
                          className="list-disc list-inside"
                        >
                          {
                            todoList.todos.map((todo) => (
                              <li key={todo}>{todo}</li>
                            ))
                          }
                        </ul>
                      ) : (
                        <p>No todos yet.</p>
                      )
                    }
                  </li>
                ))
              }
            </ul>
            {
              addingNewList && (
                <input
                  type="text"
                  className="border-2 rounded-md p-2 mr-2"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              )
            }
            <button
              onClick={addTodoList}
              className="hover:bg-gray-200 p-2 rounded-md bg-gray-100"
            >
              Add Todo List
            </button>
          </>
        )
      }
    </PageLayout>
  )
}
