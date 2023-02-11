import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './reducers/hooks';
import { RootState } from './store';
import styled from '@emotion/styled'
import { Box } from 'rebass'
import Config from './config'
import { isFeedRoute } from './utils/routes';
import Login from './screens/login';
import { useLocation } from 'react-router-dom';
import { createRemoteRequest } from './remote';
import ProtectedRoute from './components/protectedRoute';
import { HTTPMethods } from './remote/types';
import Home from './screens/Home';
function App(props: any) {
  const { discover } = Config.reader.routes
  const { login, register } = Config.auth.routes
  console.log(useLocation().pathname);

  // useEffect(() => {
  //   const ab = async () => await fetch('http://localhost:4000/api/users', {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //   })
  //   console.log(ab().then(e => console.log(e.json())))
  // }, [])
  const [selectedDelete, setSelectedDelete] = useState([]);
  const [selectAll, setselectAll] = useState(false);

  return (
    <>
      <ProtectedRoute>
        <Routes>
          <Route path="*" element={<Navigate to={login} />} />
          <Route path={login} element={<Login  />} />
          <Route path={register} element={<Login />} />
          <Route path={discover} element={<Home />} />
        </Routes>
      </ProtectedRoute>
    </>
  );
}

const Button = styled.button<any>(({ theme }) => ({
  backgroundColor: theme.color.layout.borderPrimary
}))

export default App
