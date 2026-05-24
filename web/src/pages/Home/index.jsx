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

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const homePageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>new-api 首页</title>
    <style>
      html,
      body,
      #root {
        min-height: 100%;
        margin: 0;
        background: #0a0c10;
      }
    </style>
    <script type="module" crossorigin src="/home/assets/index-WVDRaFx5.js"></script>
    <link rel="stylesheet" crossorigin href="/home/assets/index-CIGFnVdR.css" />
  </head>
  <body>
    <div id="root"></div>
    <script>
      (function () {
        var routeMap = {
          '登录': '/login',
          '开始使用': '/register',
          '立即体验': '/console',
          '模型广场': '/pricing',
          '更多': '/pricing',
          '价格方案': '/pricing',
          '前往申请 Key': '/console/token'
        };

        document.addEventListener('click', function (event) {
          var target = event.target && event.target.closest ? event.target.closest('a, button') : null;
          if (!target) return;

          var text = (target.textContent || '').trim();
          var route = routeMap[text];

          if (route) {
            event.preventDefault();
            event.stopPropagation();
            window.parent.postMessage({ type: 'new-api-home-route', route: route }, '*');
            return;
          }

          if (target.tagName === 'A' && text === '开发文档') {
            target.setAttribute('href', '/docs');
            target.setAttribute('target', '_blank');
            target.setAttribute('rel', 'noopener noreferrer');
          }
        }, true);
      })();
    </script>
  </body>
</html>`;

const Home = () => {
  const iframeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type !== 'new-api-home-route') return;
      navigate(event.data.route);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <iframe
      ref={iframeRef}
      title='new-api 首页'
      srcDoc={homePageHtml}
      className='w-full min-h-screen border-none block'
    />
  );
};

export default Home;
