'use client'; 
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
 
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (password === passwordTwo) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Success. The user is created in Firebase');
        router.push('/profile');
      } catch (error) {
        // An error occurred. Set error message to be displayed to the user
        setError(error.message);
      }
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center max-w-md p-4 bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Create an Account</h1>
        <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="passwordTwo" value="Confirm password" />
            </div>
            <TextInput
              id="passwordTwo"
              type="password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <p className="text-sm text-gray-500">
            Must be at least 8 characters, contain at least 1 uppercase letter, and 1 lowercase letter, and 1 number.
          </p>

          <Button type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
