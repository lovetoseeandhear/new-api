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

import { publicError } from './publicToast';

const baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL
  ? import.meta.env.VITE_REACT_APP_SERVER_URL
  : '';

function buildUrl(path, params) {
  const url = new URL(path, baseURL || window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }
  if (!baseURL) {
    return `${url.pathname}${url.search}${url.hash}`;
  }
  return url.toString();
}

async function request(method, path, body, options = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    ...publicAPI.defaults.headers,
    ...(options.headers || {}),
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(buildUrl(path, options.params), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    if (response.status === 429) {
      publicError('请求次数过多，请稍后再试');
    } else if (response.status >= 500) {
      publicError('服务器暂时不可用，请稍后再试');
    }
    const error = new Error(response.statusText || 'Request failed');
    error.response = { status: response.status, data };
    throw error;
  }

  return { data, status: response.status, headers: response.headers };
}

export const publicAPI = {
  defaults: {
    headers: {},
  },
  get(path, options) {
    return request('GET', path, undefined, options);
  },
  post(path, body, options) {
    return request('POST', path, body, options);
  },
};

export function getStoredUserId() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || -1;
  } catch (error) {
    return -1;
  }
}

export function refreshPublicAuthHeader() {
  publicAPI.defaults.headers['New-API-User'] = getStoredUserId();
}
