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

import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../common/ui/Loading';
import { setStatusData } from '../../helpers/data';
import { StatusContext } from '../../context/Status';
import { UserContext } from '../../context/User';
import PublicRoutes from '../../PublicRoutes';
import { publicAPI } from '../../helpers/publicApi';

const PageLayout = lazy(() => import('./PageLayout'));

const PUBLIC_PATH_PREFIXES = [
  '/',
  '/login',
  '/register',
];

function isPublicPath(pathname) {
  return PUBLIC_PATH_PREFIXES.some((path) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

function applyDocumentBranding(data) {
  const systemName =
    data?.system_name || localStorage.getItem('system_name') || 'Flowbay API';
  const logo = data?.logo || localStorage.getItem('logo') || '/logo.png';

  if (systemName) {
    document.title = systemName;
  }
  if (logo) {
    const linkElement = document.querySelector("link[rel~='icon']");
    if (linkElement) {
      linkElement.href = logo;
    }
  }
}

const RootLayout = () => {
  const location = useLocation();
  const [, statusDispatch] = useContext(StatusContext);
  const [, userDispatch] = useContext(UserContext);
  const publicPath = isPublicPath(location.pathname);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        userDispatch({ type: 'login', payload: JSON.parse(user) });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, [userDispatch]);

  useEffect(() => {
    if (!publicPath) return;

    let ignore = false;
    publicAPI
      .get('/api/public/status')
      .then((res) => {
        const { success, data } = res.data || {};
        if (!ignore && success) {
          statusDispatch({ type: 'set', payload: data });
          setStatusData(data);
          applyDocumentBranding(data);
        }
      })
      .catch(() => {
        applyDocumentBranding();
      });

    return () => {
      ignore = true;
    };
  }, [publicPath, statusDispatch]);

  if (publicPath) {
    return <PublicRoutes />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <PageLayout />
    </Suspense>
  );
};

export default RootLayout;
