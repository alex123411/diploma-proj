import { FC, useEffect } from 'react'
import ContainerLayout from './components/Layout';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import UserService from './services/UserService';

const App: FC = () => {

  UserService.isLoggedIn()

  return (
    <div>
      <Header />
      <ContainerLayout>
        <Outlet />
      </ContainerLayout>
    </div>
  )
}

export default App
