/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/common/ui/Loading';
import PublicToast from './components/common/PublicToast';

const Home = lazy(() => import('./pages/Home'));
const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = lazy(() => import('./components/auth/RegisterForm'));

const PublicAuthRedirect = ({ children }) => {
  if (localStorage.getItem('user')) {
    return <Navigate to='/console' replace />;
  }
  return children;
};

const PublicNotFound = () => (
  <main className='auth-lite-page'>
    <section className='auth-lite-panel'>
      <h1>页面不存在</h1>
      <p className='auth-lite-footnote'>
        <a href='/'>返回首页</a>
      </p>
    </section>
  </main>
);

const PublicRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={
              <PublicAuthRedirect>
                <LoginForm />
              </PublicAuthRedirect>
            }
          />
          <Route
            path='/register'
            element={
              <PublicAuthRedirect>
                <RegisterForm />
              </PublicAuthRedirect>
            }
          />
          <Route path='*' element={<PublicNotFound />} />
        </Routes>
      </Suspense>
      <PublicToast />
    </>
  );
};

export default PublicRoutes;
