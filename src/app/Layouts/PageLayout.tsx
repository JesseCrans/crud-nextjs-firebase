import React from 'react'
import { useUser } from '../contexts/UserContext'

const PageLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { loading } = useUser();

  return (
    <main className='p-4'>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          children
        )
      }
    </main>
  )
}

export default PageLayout