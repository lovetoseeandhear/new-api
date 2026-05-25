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
        function replaceBrandLogos() {
          var brandLabels = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function (node) {
            return (node.textContent || '').trim() === 'Flowbay API';
          });

          brandLabels.forEach(function (label) {
            var logoWrap = label.previousElementSibling;
            if (!logoWrap || logoWrap.getAttribute('data-new-api-logo') === 'true') return;

            logoWrap.setAttribute('data-new-api-logo', 'true');
            logoWrap.innerHTML = '<img src="/logo.png" alt="new-api" style="width:100%;height:100%;object-fit:contain;border-radius:inherit;" />';
            logoWrap.style.background = 'transparent';
          });
        }

        function restyleGatewayCard() {
          var gatewayTitle = Array.prototype.slice.call(document.querySelectorAll('h3')).find(function (node) {
            return (node.textContent || '').trim() === '异构网关 统一融合';
          });
          if (!gatewayTitle) return;

          var card = gatewayTitle.parentElement;
          while (card && (!card.className || String(card.className).indexOf('lg:col-span-2') === -1)) {
            card = card.parentElement;
          }
          if (!card || card.getAttribute('data-new-api-gateway-style') === 'true') return;

          card.setAttribute('data-new-api-gateway-style', 'true');
          card.style.background = 'linear-gradient(135deg, rgba(10,12,16,0.98) 0%, rgba(15,23,42,0.96) 44%, rgba(17,24,39,0.95) 100%)';
          card.style.border = '1px solid rgba(34,211,238,0.16)';
          card.style.boxShadow = '0 22px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06)';

          gatewayTitle.style.color = '#f8fafc';
          gatewayTitle.style.textShadow = '0 0 24px rgba(34,211,238,0.18)';

          var description = gatewayTitle.nextElementSibling;
          if (description) {
            description.style.color = 'rgba(203,213,225,0.86)';
          }

          Array.prototype.slice.call(card.children).forEach(function (child) {
            var className = String(child.className || '');
            if (className.indexOf('top-0') !== -1 && className.indexOf('right-0') !== -1) {
              child.style.background = 'radial-gradient(circle, rgba(34,211,238,0.18), rgba(139,92,246,0.10) 42%, transparent 70%)';
              child.style.opacity = '1';
            }
          });
        }

        function applyHomeAdjustments() {
          replaceBrandLogos();
          restyleGatewayCard();
        }

        applyHomeAdjustments();
        var homeObserver = new MutationObserver(applyHomeAdjustments);
        homeObserver.observe(document.body, { childList: true, subtree: true });

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
