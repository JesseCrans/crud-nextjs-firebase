import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import { UserProvider } from './contexts/UserContext';

export const metadata: Metadata = {
  title: 'ToDo App',
  description: 'ToDo app made with Next.js, Tailwind, Typescript, and Firebase. Full CRUD functionality with user authentication.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=''>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
