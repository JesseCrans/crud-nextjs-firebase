import React from 'react'

const FormLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <form className='flex flex-col gap-3 border-2 p-4 rounded-md'>
      {children}
    </form>
  )
}

export default FormLayout