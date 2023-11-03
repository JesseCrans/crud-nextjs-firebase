import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Page = () => {
  return (
    <main className='px-16 py-4 flex flex-col justify-start items-center'>
      <h1 className='m-4'>About</h1>
      <div className='text-center'>
        This ToDo app was made as a practice project by <a href='https://github.com/JesseCrans' className='text-blue-500 hover:text-blue-700 underline' >me <FontAwesomeIcon icon={faGithub} className='h-4 inline' /></a> for learning:
        <ul
          className='list-disc list-inside'
        >
          <li>React</li>
          <li>Next.js</li>
          <li>Firebase</li>
          <li>Typescript</li>
          <li>Tailwind CSS</li>
        </ul>
        I found Next.js to be very intuitive in the way it handles routes/pages. It is very easy to get started with and it is very easy to add new pages. Especially when using layouts for pages.
        Firebase authentication was a little tricky to figure out. The documentation is very general, so it is hard to figure how to adapt it to your specific framework.
        Also, I used the Realtime Database because I wanted to learn it for other projects I want to make. Such as an online multiplayer game with Firebase.
        I am not sure which database type is best for either type of project but Firestore also doesn't seem that hard to learn. In case I want to switch over.
        The process of storing and fetching data from the database was also tricky to figure out and was revised a couple of times.
        I am still not sure if I am using the best practices, but it works fine I think.
        Typescript is a very nice addition to Javascript. It makes it easier to see what type of data you are working with and what functions are available.
        But sometimes it can be annoying when you are not sure what type of data you are working with and you have to look it up or do some trial and error.
        But overal I like that it keeps you nice and tidy.
        Tailwind CSS is a very nice framework. It is very easy to use and makes it easy to make a responsive website.
        Getting a simple layout is very easy and very fast. Tailwind was probably my favorite thing I've learned from this project.
        What I would do differently for future projects is, I would try to plan the project out a little better, so that I can make more use of react components.
        Now the returns of the components can be a bit messy and long. I would try to document everything from the start including tests.
        I would also try to make more use of the typescript types and try to make them more specific and realy define everything.
        And more specifically for authentication a way of verifying the user's email address and changing the password.
      </div>
    </main>
  )
}

export default Page