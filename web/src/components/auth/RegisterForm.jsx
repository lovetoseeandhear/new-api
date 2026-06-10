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

import React, {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusContext } from '../../context/Status';
import { UserContext } from '../../context/User';
import { setUserData } from '../../helpers/data';
import { publicAPI, refreshPublicAuthHeader } from '../../helpers/publicApi';
import { publicError, publicInfo, publicSuccess } from '../../helpers/publicToast';

const Turnstile = lazy(() => import('react-turnstile'));
const TelegramLoginButton = lazy(() => import('react-telegram-login'));

function getStatus(statusState) {
  if (statusState?.status) return statusState.status;
  try {
    return JSON.parse(localStorage.getItem('status') || '{}') || {};
  } catch (error) {
    return {};
  }
}

function getSystemName() {
  return localStorage.getItem('system_name') || 'Flowbay API';
}

function getLogo() {
  return localStorage.getItem('logo') || '/logo.png';
}

async function getOAuthState() {
  let path = '/api/oauth/state';
  const affCode = localStorage.getItem('aff');
  if (affCode) path += `?aff=${affCode}`;
  const res = await publicAPI.get(path);
  if (res.data?.success) return res.data.data;
  publicError(res.data?.message || 'OAuth 初始化失败');
  return '';
}

async function prepareOAuthState() {
  try {
    await publicAPI.get('/api/user/logout', { skipErrorHandler: true });
  } catch (error) {}
  localStorage.removeItem('user');
  refreshPublicAuthHeader();
  return getOAuthState();
}

function redirectTo(url) {
  window.location.assign(typeof url === 'string' ? url : url.toString());
}

const AuthShell = ({ children }) => (
  <main className='auth-lite-page'>
    <section className='auth-lite-panel'>
      <Link to='/' className='auth-lite-brand'>
        <img src={getLogo()} alt='' />
        <span>{getSystemName()}</span>
      </Link>
      <h1>注册</h1>
      {children}
    </section>
  </main>
);

const LegalConsent = ({ status, agreedToTerms, setAgreedToTerms }) => {
  const hasUserAgreement = Boolean(status.user_agreement_enabled);
  const hasPrivacyPolicy = Boolean(status.privacy_policy_enabled);
  if (!hasUserAgreement && !hasPrivacyPolicy) return null;

  return (
    <label className='auth-lite-consent'>
      <input
        type='checkbox'
        checked={agreedToTerms}
        onChange={(event) => setAgreedToTerms(event.target.checked)}
      />
      <span>
        我已阅读并同意
        {hasUserAgreement && (
          <a href='/user-agreement' target='_blank' rel='noreferrer'>
            用户协议
          </a>
        )}
        {hasUserAgreement && hasPrivacyPolicy ? '和' : ''}
        {hasPrivacyPolicy && (
          <a href='/privacy-policy' target='_blank' rel='noreferrer'>
            隐私政策
          </a>
        )}
      </span>
    </label>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [, userDispatch] = useContext(UserContext);
  const [statusState] = useContext(StatusContext);
  const status = useMemo(() => getStatus(statusState), [statusState]);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    verification_code: '',
  });
  const [showEmailRegister, setShowEmailRegister] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState('');
  const [countdown, setCountdown] = useState(0);

  const hasLegal = status.user_agreement_enabled || status.privacy_policy_enabled;
  const hasCustomOAuth = (status.custom_oauth_providers || []).length > 0;
  const hasOAuthRegisterOptions = Boolean(
    status.github_oauth ||
      status.discord_oauth ||
      status.oidc_enabled ||
      status.wechat_login ||
      status.linuxdo_oauth ||
      status.telegram_oauth ||
      hasCustomOAuth,
  );

  useEffect(() => {
    const affCode = new URLSearchParams(window.location.search).get('aff');
    if (affCode) {
      localStorage.setItem('aff', affCode);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  const requireConsent = () => {
    if (hasLegal && !agreedToTerms) {
      publicInfo('请先阅读并同意用户协议和隐私政策');
      return true;
    }
    return false;
  };

  const persistLogin = (data) => {
    userDispatch({ type: 'login', payload: data });
    setUserData(data);
    refreshPublicAuthHeader();
    publicSuccess('登录成功');
    navigate('/console');
  };

  const setInput = (name, value) => {
    setInputs((current) => ({ ...current, [name]: value }));
  };

  const sendVerificationCode = async () => {
    if (!inputs.email) {
      publicInfo('请输入邮箱地址');
      return;
    }
    if (status.turnstile_check && !turnstileToken) {
      publicInfo('请稍后几秒重试，Turnstile 正在检查用户环境');
      return;
    }
    setLoading('verification');
    try {
      const res = await publicAPI.get(
        `/api/verification?email=${encodeURIComponent(inputs.email)}&turnstile=${turnstileToken}`,
      );
      if (res.data?.success) {
        publicSuccess('验证码发送成功，请检查你的邮箱');
        setCountdown(30);
      } else {
        publicError(res.data?.message || '验证码发送失败');
      }
    } catch (error) {
      publicError('验证码发送失败，请重试');
    } finally {
      setLoading('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (requireConsent()) return;
    if (inputs.password.length < 8) {
      publicInfo('密码长度不得小于 8 位');
      return;
    }
    if (inputs.password !== inputs.password2) {
      publicInfo('两次输入的密码不一致');
      return;
    }
    if (!inputs.username || !inputs.password) {
      publicInfo('请输入用户名和密码');
      return;
    }
    if (status.email_verification && !inputs.email) {
      publicInfo('请输入邮箱地址');
      return;
    }
    if (status.turnstile_check && !turnstileToken) {
      publicInfo('请稍后几秒重试，Turnstile 正在检查用户环境');
      return;
    }
    setLoading('register');
    try {
      const affCode =
        new URLSearchParams(window.location.search).get('aff') ||
        localStorage.getItem('aff') ||
        '';
      const res = await publicAPI.post(
        `/api/user/register?turnstile=${turnstileToken}`,
        {
          ...inputs,
          aff_code: affCode,
        },
      );
      if (res.data?.success) {
        publicSuccess('注册成功');
        navigate('/login');
      } else {
        publicError(res.data?.message || '注册失败');
      }
    } catch (error) {
      publicError('注册失败，请重试');
    } finally {
      setLoading('');
    }
  };

  const handleTelegramLogin = async (response) => {
    if (requireConsent()) return;
    const fields = [
      'id',
      'first_name',
      'last_name',
      'username',
      'photo_url',
      'auth_date',
      'hash',
      'lang',
    ];
    const params = {};
    fields.forEach((field) => {
      if (response[field]) params[field] = response[field];
    });
    try {
      const res = await publicAPI.get('/api/oauth/telegram/login', { params });
      if (res.data?.success) {
        persistLogin(res.data.data);
      } else {
        publicError(res.data?.message || '登录失败');
      }
    } catch (error) {
      publicError('登录失败，请重试');
    }
  };

  const handleOAuth = async (type, provider) => {
    if (requireConsent()) return;
    setLoading(type);
    const state = await prepareOAuthState();
    if (!state) {
      setLoading('');
      return;
    }
    if (type === 'github') {
      redirectTo(
        `https://github.com/login/oauth/authorize?client_id=${status.github_client_id}&state=${state}&scope=user:email`,
      );
      return;
    }
    if (type === 'discord') {
      const redirectUri = `${window.location.origin}/oauth/discord`;
      redirectTo(
        `https://discord.com/oauth2/authorize?client_id=${status.discord_client_id}&redirect_uri=${redirectUri}&response_type=code&scope=identify+openid&state=${state}`,
      );
      return;
    }
    if (type === 'oidc') {
      const url = new URL(status.oidc_authorization_endpoint);
      url.searchParams.set('client_id', status.oidc_client_id);
      url.searchParams.set('redirect_uri', `${window.location.origin}/oauth/oidc`);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', 'openid profile email');
      url.searchParams.set('state', state);
      redirectTo(url);
      return;
    }
    if (type === 'linuxdo') {
      redirectTo(
        `https://connect.linux.do/oauth2/authorize?response_type=code&client_id=${status.linuxdo_client_id}&state=${state}`,
      );
      return;
    }
    if (type === 'custom' && provider) {
      const url = new URL(provider.authorization_endpoint);
      url.searchParams.set('client_id', provider.client_id);
      url.searchParams.set('redirect_uri', `${window.location.origin}/oauth/${provider.slug}`);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', provider.scopes || 'openid profile email');
      url.searchParams.set('state', state);
      redirectTo(url);
    }
  };

  const renderOAuthOptions = () => (
    <div className='auth-lite-actions'>
      {status.github_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('github')}>
          {loading === 'github' ? '正在跳转...' : '使用 GitHub 继续'}
        </button>
      )}
      {status.discord_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('discord')}>
          {loading === 'discord' ? '正在跳转...' : '使用 Discord 继续'}
        </button>
      )}
      {status.oidc_enabled && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('oidc')}>
          {loading === 'oidc' ? '正在跳转...' : '使用 OIDC 继续'}
        </button>
      )}
      {status.linuxdo_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('linuxdo')}>
          {loading === 'linuxdo' ? '正在跳转...' : '使用 LinuxDO 继续'}
        </button>
      )}
      {(status.custom_oauth_providers || []).map((provider) => (
        <button
          key={provider.slug}
          type='button'
          className='auth-lite-secondary'
          onClick={() => handleOAuth('custom', provider)}
        >
          使用 {provider.name} 继续
        </button>
      ))}
      {status.telegram_oauth && (
        <Suspense fallback={null}>
          <div className='auth-lite-telegram'>
            <TelegramLoginButton
              dataOnauth={handleTelegramLogin}
              botName={status.telegram_bot_name}
            />
          </div>
        </Suspense>
      )}
      <div className='auth-lite-divider'>或</div>
      <button
        type='button'
        className='auth-lite-primary'
        onClick={() => setShowEmailRegister(true)}
      >
        使用用户名注册
      </button>
    </div>
  );

  const renderRegisterForm = () => (
    <form className='auth-lite-form' onSubmit={handleSubmit}>
      <label>
        用户名
        <input
          value={inputs.username}
          onChange={(event) => setInput('username', event.target.value)}
          placeholder='请输入用户名'
          autoComplete='username'
        />
      </label>
      <label>
        密码
        <input
          value={inputs.password}
          onChange={(event) => setInput('password', event.target.value)}
          type='password'
          placeholder='输入密码，最短 8 位，最长 20 位'
          autoComplete='new-password'
        />
      </label>
      <label>
        确认密码
        <input
          value={inputs.password2}
          onChange={(event) => setInput('password2', event.target.value)}
          type='password'
          placeholder='确认密码'
          autoComplete='new-password'
        />
      </label>
      {status.email_verification && (
        <>
          <label>
            邮箱
            <span className='auth-lite-inline-control'>
              <input
                value={inputs.email}
                onChange={(event) => setInput('email', event.target.value)}
                placeholder='输入邮箱地址'
                type='email'
                autoComplete='email'
              />
              <button
                type='button'
                onClick={sendVerificationCode}
                disabled={countdown > 0 || loading === 'verification'}
              >
                {countdown > 0 ? `${countdown}s` : '验证码'}
              </button>
            </span>
          </label>
          <label>
            验证码
            <input
              value={inputs.verification_code}
              onChange={(event) => setInput('verification_code', event.target.value)}
              placeholder='输入验证码'
            />
          </label>
        </>
      )}
      <LegalConsent
        status={status}
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
      />
      <button
        className='auth-lite-primary'
        type='submit'
        disabled={loading === 'register' || (hasLegal && !agreedToTerms)}
      >
        {loading === 'register' ? '注册中...' : '注册'}
      </button>
      {hasOAuthRegisterOptions && (
        <button
          type='button'
          className='auth-lite-secondary'
          onClick={() => setShowEmailRegister(false)}
        >
          其他注册选项
        </button>
      )}
    </form>
  );

  return (
    <AuthShell>
      <LegalConsent
        status={!showEmailRegister && hasOAuthRegisterOptions ? status : {}}
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
      />
      {showEmailRegister || !hasOAuthRegisterOptions
        ? renderRegisterForm()
        : renderOAuthOptions()}
      <p className='auth-lite-footnote'>
        已有账户？ <Link to='/login'>登录</Link>
      </p>
      {status.turnstile_check && (
        <Suspense fallback={null}>
          <div className='auth-lite-turnstile'>
            <Turnstile
              sitekey={status.turnstile_site_key}
              onVerify={(token) => setTurnstileToken(token)}
            />
          </div>
        </Suspense>
      )}
    </AuthShell>
  );
};

export default RegisterForm;
