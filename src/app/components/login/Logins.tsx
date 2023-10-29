import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { useUser } from '../../contexts/UserContext';

const Logins = () => {
  const { user, googleLogin, githubLogin } = useUser();

  const googleSignin = async (e: any) => {
    e.preventDefault();
    googleLogin();
  }

  const githubSignin = async (e: any) => {
    e.preventDefault();
    githubLogin();
  }

  return (
    <div>
      <h1 className='w-full text-center'>Or log in with</h1>
      <div className='p-2 flex gap-2 justify-evenly'>
        <button
          title='Sign in with Google'
          onClick={googleSignin}
        >
          <Image src='/assets/web_neutral_rd_na.svg' alt='Google' width={60} height={60} />
        </button>
        <button
          className='text-6xl'
          title='Sign in with Github'
          onClick={githubSignin}
        >
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}

export default Logins