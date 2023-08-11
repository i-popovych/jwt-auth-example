import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { login, registration } from '../store/slices/user/actions';

export const AuthForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    dispatch(login({email, password}))
  }

  const handleRegistration = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    dispatch(registration({email, password}))
  }

  return (
    <div>


      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegistration} type="submit">Registration</button>
      <button onClick={handleLogin} type="submit">Login</button>
    </div>
  );
};
