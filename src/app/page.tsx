"use client";
import PageLayout from "./Layouts/PageLayout";
import { useUser } from "./contexts/UserContext";
import TodoListPreview from "./components/todolists/TodoListPreview";
import TodoListTitle from "./components/todolists/TodoListTitle";
import Todo from "./components/todolists/Todo";
import { db } from "./firebase";
import { ref, push, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";
import Link from "next/link";

export interface TodoList {
  name: string,
  todos: {},
  id: string,
}

export type Todo = [string, { name: string, completed: boolean }];

export default function Home() {
  const [todoLists, setTodoLists] = useState([] as TodoList[]);

  const [newListName, setNewListName] = useState(''); // name of new todo list
  const [addingNewList, setAddingNewList] = useState(false); // wether or not the user is adding a new todo list

  const [viewingListId, setViewingListId] = useState(''); // id of todo list being viewed
  const [viewingListName, setViewingListName] = useState('' as string | undefined); // name of todo list being viewed
  const [viewingListTodos, setViewingListTodos] = useState([] as Todo[]); // todos of todo list being viewed

  const [newTodo, setNewTodo] = useState(''); // name of new todo
  const [addingNewTodo, setAddingNewTodo] = useState(false); // wether or not the user is adding a new todo

  const [editingListName, setEditingListName] = useState(false); // wether or not the user is editing the name of the current todo list
  const [editingTodo, setEditingTodo] = useState(''); // id of todo being edited

  const { user } = useUser(); // user from UserContext

  // getting todo lists from database when user updates
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

  // getting todo list name and todos when viewing list updates
  useEffect(() => {
    const todoList = todoLists.find((todoList) => todoList.id == viewingListId);
    setViewingListName(todoList?.name);
    setViewingListTodos(Object.entries(todoList?.todos || {}));
  }, [todoLists, viewingListId]);

  // add a new todo list
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
        todos: {},
        id: newTodoListRef.key,
      })
      setNewListName('');
      setAddingNewList(false);
    } else {
      setAddingNewList(true);
    }
  }

  // add a new todo in the current todo list
  const addTodo = async () => {
    if (addingNewTodo) {
      const todo = {
        name: newTodo.trim(),
        completed: false
      };
      if (todo.name == '') {
        alert('Please enter a todo.');
        return
      }
      const todoListsRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId + '/todos');
      const newTodoRef = push(todoListsRef);
      set(newTodoRef, todo);
      setNewTodo('');
      setAddingNewTodo(false);
    } else {
      setEditingTodo('');
      setNewTodo('');
      setAddingNewTodo(true);
    }
  }

  // change the status of a todo
  const changeTodoStatus = async (e: any, todoId: string) => {
    const todoRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId + '/todos/' + todoId + '/completed');
    set(todoRef, e.target.checked);
  }

  // delete a todo list
  const deleteTodoList = async () => {
    if (confirm('Are you sure you want to delete this todo list? This cannot be undone.')) {
      const todoListRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId);
      set(todoListRef, null);
      setViewingListId('');
    }
  }

  // delete a todo from the current todo list
  const deleteTodo = async (todoId: string) => {
    if (confirm('Are you sure you want to delete this todo? This cannot be undone.')) {
      const todoRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId + '/todos/' + todoId);
      set(todoRef, null);
    }
  }

  // edit the name of the current todo list
  const editListName = async () => {
    if (editingListName) {
      if (newListName.trim() == '') {
        setEditingListName(false);
        return;
      }
      const todoListRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId + '/name');
      set(todoListRef, newListName);
      setNewListName('');
      setEditingListName(false);
    } else {
      setEditingListName(true);
    }
  }

  // edit the name of a todo in the current todo list
  const editTodo = async (todoId: string) => {
    if (editingTodo && editingTodo == todoId) {
      if (newTodo.trim() == '') {
        setEditingTodo('');
        return;
      }
      const todoRef = ref(db, 'users/' + user.uid + '/todoLists/' + viewingListId + '/todos/' + todoId + '/name');
      set(todoRef, newTodo);
      setNewTodo('');
      setEditingTodo('');
    } else {
      setNewTodo('');
      setAddingNewTodo(false);
      setEditingTodo(todoId);
    }
  }

  return (
    <PageLayout>
      {
        !user.uid ? ( // if user is not logged in
          <Link href='/login'>Please login to see your ToDo lists.</Link>
        ) : viewingListId == '' ? ( // if user is logged in and not viewing a todo list
          <>
            <ul className="flex flex-wrap gap-4 my-4">
              {
                todoLists.map((todoList) => {
                  return (
                    <button
                      className="text-left h-fit"
                      onClick={() => setViewingListId(todoList.id)}
                      key={todoList.id}
                    >
                      <TodoListPreview
                        todoListName={todoList.name}
                        todoListTodos={todoList.todos}
                      />
                    </button>
                  )
                })
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
        ) : ( // if user is logged in and viewing a todo list
          <>
            <TodoListTitle
              editingListName={editingListName}
              newListName={newListName}
              setNewListName={setNewListName}
              viewingListName={viewingListName || ''}
              editListName={editListName}
              deleteTodoList={deleteTodoList}
            />
            <div
              className="bg-gray-100 p-4 mb-4 rounded-b-md w-full"
            >
              <ul
                className="pb-4"
              >
                {
                  viewingListTodos.length == 0 ? (
                    <p className="text-left">No todos</p>
                  ) : (
                    viewingListTodos.map(([todoId, todo]) => (
                      <div key={todoId}>
                        <Todo
                          todoId={todoId}
                          todo={todo}
                          editingTodo={editingTodo}
                          newTodo={newTodo}
                          setNewTodo={setNewTodo}
                          changeTodoStatus={changeTodoStatus}
                          editTodo={editTodo}
                          deleteTodo={deleteTodo}
                        />
                      </div>
                    ))
                  )
                }
              </ul>
              {
                addingNewTodo && (
                  <input
                    type="text"
                    className="rounded-md p-2 mr-2"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                )
              }
              <button
                onClick={addTodo}
                className="hover:bg-gray-300 p-2 rounded-md bg-gray-200"
              >
                Add Todo
              </button>
            </div>
            <button
              onClick={() => setViewingListId('')}
              className="hover:bg-gray-200 p-2 rounded-md bg-gray-100"
            >
              Back
            </button>
          </>
        )
      }
    </PageLayout >
  )
}
