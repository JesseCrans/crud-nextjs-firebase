"use client";
import React, { useState, useEffect } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../firebase';
import { useUser } from '../contexts/UserContext';
import PageLayout from '../Layouts/PageLayout';

interface User {
  email: string,
  username: string,
  createdOn: string,
  lastLogin: string,
  photoURL: string
}

const Page = () => {
  const [username, setUsername] = useState("");
  const [created, setCreated] = useState("");
  // const [userInfo, setUserInfo] = useState({} as User);
  const [editing, setEditing] = useState(false);
  const { user, userInfo } = useUser();

  const changeUsername = async (e: any) => {
    e.preventDefault();
    if (editing) {
      const usernameRef = ref(db, 'users/' + user.uid + '/username');
      await set(usernameRef, username);
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  useEffect(() => {
    if (userInfo) {
      const date = new Date(userInfo.createdOn);
      const dateOptions: any = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZoneName: 'short'
      }
      const createdOn = date.toLocaleDateString(dateOptions);
      setCreated(createdOn);
    }
  }, [userInfo])

  return (
    <PageLayout>
      {
        user.uid ? (
          <div className='flex flex-col items-start justify-start'>
            <h1>Profile</h1>
            <label className='flex justify-between gap-2 items-center'>
              Username:
              {
                editing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border-2 rounded-sm'
                    maxLength={20}
                    autoComplete='new-password'
                    placeholder={userInfo.username}
                  />
                ) : (
                  <p>{userInfo.username}</p>
                )
              }
              <button
                onClick={changeUsername}
                className='hover:bg-gray-200 px-2 py-1 rounded-md bg-gray-100'
              >
                Change
              </button>
            </label>
            <p>Created on: {created}</p>
          </div>
        ) : (
          <h1>You must be logged in to view this page.</h1>
        )
      }
    </PageLayout>
  )
}

export default Page