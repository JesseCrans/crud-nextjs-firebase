"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUser } from '../UserContext';

const Navbar = () => {
  const { user, logout, loading } = useUser();

  return (
    <nav
      className='p-4 border-b-2'
    >
      <ul
        className='flex justify-between items-center'
      >
        <li>
          <Link href='/'>Home</Link>
        </li>
        {
          loading ? (
            <p>...</p>
          ) : !user.email ? (
            <div className='flex justify-between gap-4'>
              <li className=''>
                <Link href='/login'>Log in</Link>
              </li>
              <li>
                <Link href='/register'>Register</Link>
              </li>
            </div>
          ) : (
            <div className='flex justify-between gap-4'>
              {
                user.displayName ? (
                  <li>
                    Logged in as {user.displayName}
                  </li>
                ) : user.email ? (
                  <li>
                    Logged in as {user.email}
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