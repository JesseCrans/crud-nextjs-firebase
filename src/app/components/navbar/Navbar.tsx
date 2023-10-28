"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUser } from '../../UserContext';
import { onValue } from 'firebase/database';

const Navbar = () => {
  const { user, logout, loading, userInfo } = useUser();

  return (
    <nav
      className='p-4 border-b-2'
    >
      <ul
        className='flex flex-col items-center gap-2 justify-start sm:flex-row sm:justify-between sm:items-center'
      >
        <div className='flex sm:justify-between sm:gap-4 sm:flex-row sm:p-0 sm:border-none flex-col items-center gap-2 border-b-2 pb-2'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </div>
        {
          loading ? (
            <p>...</p>
          ) : !userInfo ? (
            <div className='flex justify-between gap-4'>
              <li className=''>
                <Link href='/login'>Log in</Link>
              </li>
              <li>
                <Link href='/register'>Register</Link>
              </li>
            </div>
          ) : (
            <div className='flex sm:flex-row sm:justify-start sm:gap-4 flex-col items-center gap-2'>
              {
                userInfo.username ? (
                  <li>
                    Logged in as {userInfo.username}
                  </li>
                ) : userInfo.email ? (
                  <li>
                    Logged in with {userInfo.email.length > 20 ? userInfo.email.slice(0, 20) + '...' : userInfo.email}
                  </li>
                ) : (
                  <li>
                    Logged in
                  </li>
                )
              }
              <li>
                <button onClick={logout}>Log out</button>
              </li>
            </div>
          )
        }

      </ul>
    </nav>
  )
}

export default Navbar