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
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context/User';
import { StatusContext } from '../../context/Status';
import { setUserData } from '../../helpers/data';
import { publicAPI, refreshPublicAuthHeader } from '../../helpers/publicApi';
import { publicError, publicInfo, publicSuccess } from '../../helpers/publicToast';
import {
  buildAssertionResult,
  isPasskeySupported,
  prepareCredentialRequestOptions,
} from '../../helpers/passkey';

const Turnstile = lazy(() => import('react-turnstile'));
const TelegramLoginButton = lazy(() => import('react-telegram-login'));

const oauthButtonText = {
  github: '使用 GitHub 继续',
  discord: '使用 Discord 继续',
  oidc: '使用 OIDC 继续',
  linuxdo: '使用 LinuxDO 继续',
  wechat: '使用微信继续',
};

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

const AuthShell = ({ title, children }) => (
  <main className='auth-lite-page'>
    <section className='auth-lite-panel'>
      <Link to='/' className='auth-lite-brand'>
        <img src={getLogo()} alt='' />
        <span>{getSystemName()}</span>
      </Link>
      <h1>{title}</h1>
      {children}
    </section>
  </main>
);

const LegalConsent = ({
  status,
  agreedToTerms,
  setAgreedToTerms,
}) => {
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

const WeChatModal = ({
  visible,
  status,
  code,
  loading,
  onChange,
  onCancel,
  onSubmit,
}) => {
  if (!visible) return null;
  return (
    <div className='auth-lite-modal-backdrop'>
      <div className='auth-lite-modal'>
        <h2>微信扫码登录</h2>
        {status.wechat_qrcode && <img src={status.wechat_qrcode} alt='微信二维码' />}
        <p>微信扫码关注公众号，输入「验证码」获取验证码（三分钟内有效）</p>
        <input
          value={code}
          onChange={(event) => onChange(event.target.value)}
          placeholder='验证码'
        />
        <div className='auth-lite-modal-actions'>
          <button type='button' onClick={onCancel}>
            取消
          </button>
          <button type='button' onClick={onSubmit} disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TwoFAModal = ({ visible, onSuccess, onCancel }) => {
  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const submit = async () => {
    if (!code) {
      publicInfo('请输入验证码');
      return;
    }
    if (useBackupCode && code.length !== 8) {
      publicInfo('备用码必须是8位');
      return;
    }
    if (!useBackupCode && !/^\d{6}$/.test(code)) {
      publicInfo('验证码必须是6位数字');
      return;
    }
    setLoading(true);
    try {
      const res = await publicAPI.post('/api/user/login/2fa', { code });
      if (res.data?.success) {
        onSuccess(res.data.data);
      } else {
        publicError(res.data?.message || '验证失败');
      }
    } catch (error) {
      publicError('验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-lite-modal-backdrop'>
      <div className='auth-lite-modal'>
        <h2>两步验证</h2>
        <p>请输入认证器应用显示的验证码完成登录</p>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submit();
          }}
          placeholder={useBackupCode ? '请输入8位备用码' : '请输入6位验证码'}
          autoFocus
        />
        <button type='button' className='auth-lite-primary' onClick={submit}>
          {loading ? '验证中...' : '验证并登录'}
        </button>
        <button
          type='button'
          className='auth-lite-link-button'
          onClick={() => {
            setUseBackupCode((value) => !value);
            setCode('');
          }}
        >
          {useBackupCode ? '使用认证器验证码' : '使用备用码'}
        </button>
        <button type='button' className='auth-lite-link-button' onClick={onCancel}>
          返回登录
        </button>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, userDispatch] = useContext(UserContext);
  const [statusState] = useContext(StatusContext);
  const status = useMemo(() => getStatus(statusState), [statusState]);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    wechat_verification_code: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showWeChatLoginModal, setShowWeChatLoginModal] = useState(false);
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passkeySupported, setPasskeySupported] = useState(false);

  const hasLegal = status.user_agreement_enabled || status.privacy_policy_enabled;
  const hasCustomOAuth = (status.custom_oauth_providers || []).length > 0;
  const hasOAuthLoginOptions = Boolean(
    status.github_oauth ||
      status.discord_oauth ||
      status.oidc_enabled ||
      status.wechat_login ||
      status.linuxdo_oauth ||
      status.telegram_oauth ||
      hasCustomOAuth ||
      status.passkey_login,
  );

  useEffect(() => {
    if (searchParams.get('expired')) {
      publicError('未登录或登录已过期，请重新登录');
    }
  }, [searchParams]);

  useEffect(() => {
    isPasskeySupported()
      .then(setPasskeySupported)
      .catch(() => setPasskeySupported(false));
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (requireConsent()) return;
    if (status.turnstile_check && !turnstileToken) {
      publicInfo('请稍后几秒重试，Turnstile 正在检查用户环境');
      return;
    }
    if (!inputs.username || !inputs.password) {
      publicInfo('请输入用户名和密码');
      return;
    }
    setLoading('password');
    try {
      const res = await publicAPI.post(
        `/api/user/login?turnstile=${turnstileToken}`,
        {
          username: inputs.username,
          password: inputs.password,
        },
      );
      const { success, message, data } = res.data;
      if (!success) {
        publicError(message || '登录失败');
        return;
      }
      if (data?.require_2fa) {
        setShowTwoFA(true);
        return;
      }
      persistLogin(data);
      if (inputs.username === 'root' && inputs.password === '123456') {
        publicInfo('您正在使用默认密码，请立刻修改默认密码');
      }
    } catch (error) {
      publicError('登录失败，请重试');
    } finally {
      setLoading('');
    }
  };

  const handleWeChatSubmit = async () => {
    if (status.turnstile_check && !turnstileToken) {
      publicInfo('请稍后几秒重试，Turnstile 正在检查用户环境');
      return;
    }
    setLoading('wechat-code');
    try {
      const res = await publicAPI.get(
        `/api/oauth/wechat?code=${inputs.wechat_verification_code}`,
      );
      if (res.data?.success) {
        persistLogin(res.data.data);
      } else {
        publicError(res.data?.message || '登录失败');
      }
    } catch (error) {
      publicError('登录失败，请重试');
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

  const handlePasskeyLogin = async () => {
    if (requireConsent()) return;
    if (!passkeySupported || !window.PublicKeyCredential) {
      publicInfo('当前环境无法使用 Passkey 登录');
      return;
    }
    setLoading('passkey');
    try {
      const beginRes = await publicAPI.post('/api/user/passkey/login/begin');
      if (!beginRes.data?.success) {
        publicError(beginRes.data?.message || '无法发起 Passkey 登录');
        return;
      }
      const publicKeyOptions = prepareCredentialRequestOptions(
        beginRes.data.data?.options || beginRes.data.data?.publicKey || beginRes.data.data,
      );
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      });
      const payload = buildAssertionResult(assertion);
      const finishRes = await publicAPI.post('/api/user/passkey/login/finish', payload);
      if (finishRes.data?.success) {
        persistLogin(finishRes.data.data);
      } else {
        publicError(finishRes.data?.message || 'Passkey 登录失败');
      }
    } catch (error) {
      publicError(error?.name === 'AbortError' ? '已取消 Passkey 登录' : 'Passkey 登录失败');
    } finally {
      setLoading('');
    }
  };

  const renderOAuthOptions = () => (
    <div className='auth-lite-actions'>
      {status.wechat_login && (
        <button
          type='button'
          className='auth-lite-secondary'
          onClick={() => {
            if (!requireConsent()) setShowWeChatLoginModal(true);
          }}
        >
          {oauthButtonText.wechat}
        </button>
      )}
      {status.github_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('github')}>
          {loading === 'github' ? '正在跳转...' : oauthButtonText.github}
        </button>
      )}
      {status.discord_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('discord')}>
          {loading === 'discord' ? '正在跳转...' : oauthButtonText.discord}
        </button>
      )}
      {status.oidc_enabled && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('oidc')}>
          {loading === 'oidc' ? '正在跳转...' : oauthButtonText.oidc}
        </button>
      )}
      {status.linuxdo_oauth && (
        <button type='button' className='auth-lite-secondary' onClick={() => handleOAuth('linuxdo')}>
          {loading === 'linuxdo' ? '正在跳转...' : oauthButtonText.linuxdo}
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
      {status.passkey_login && passkeySupported && (
        <button type='button' className='auth-lite-secondary' onClick={handlePasskeyLogin}>
          {loading === 'passkey' ? '正在验证...' : '使用 Passkey 登录'}
        </button>
      )}
      <div className='auth-lite-divider'>或</div>
      <button
        type='button'
        className='auth-lite-primary'
        onClick={() => setShowEmailLogin(true)}
      >
        使用邮箱或用户名登录
      </button>
    </div>
  );

  const renderPasswordForm = () => (
    <form className='auth-lite-form' onSubmit={handleSubmit}>
      {status.passkey_login && passkeySupported && (
        <button type='button' className='auth-lite-secondary' onClick={handlePasskeyLogin}>
          {loading === 'passkey' ? '正在验证...' : '使用 Passkey 登录'}
        </button>
      )}
      <label>
        用户名或邮箱
        <input
          value={inputs.username}
          onChange={(event) => setInputs((value) => ({ ...value, username: event.target.value }))}
          placeholder='请输入您的用户名或邮箱地址'
          autoComplete='username'
        />
      </label>
      <label>
        密码
        <input
          value={inputs.password}
          onChange={(event) => setInputs((value) => ({ ...value, password: event.target.value }))}
          type='password'
          placeholder='请输入您的密码'
          autoComplete='current-password'
        />
      </label>
      <LegalConsent
        status={status}
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
      />
      <button
        className='auth-lite-primary'
        type='submit'
        disabled={loading === 'password' || (hasLegal && !agreedToTerms)}
      >
        {loading === 'password' ? '登录中...' : '继续'}
      </button>
      <button type='button' className='auth-lite-link-button' onClick={() => navigate('/reset')}>
        忘记密码？
      </button>
      {hasOAuthLoginOptions && (
        <button
          type='button'
          className='auth-lite-secondary'
          onClick={() => setShowEmailLogin(false)}
        >
          其他登录选项
        </button>
      )}
    </form>
  );

  return (
    <AuthShell title='登录'>
      <LegalConsent
        status={!showEmailLogin && hasOAuthLoginOptions ? status : {}}
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
      />
      {showEmailLogin || !hasOAuthLoginOptions ? renderPasswordForm() : renderOAuthOptions()}
      {!status.self_use_mode_enabled && (
        <p className='auth-lite-footnote'>
          没有账户？ <Link to='/register'>注册</Link>
        </p>
      )}
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
      <WeChatModal
        visible={showWeChatLoginModal}
        status={status}
        code={inputs.wechat_verification_code}
        loading={loading === 'wechat-code'}
        onChange={(value) =>
          setInputs((current) => ({ ...current, wechat_verification_code: value }))
        }
        onCancel={() => setShowWeChatLoginModal(false)}
        onSubmit={handleWeChatSubmit}
      />
      <TwoFAModal
        visible={showTwoFA}
        onSuccess={persistLogin}
        onCancel={() => setShowTwoFA(false)}
      />
    </AuthShell>
  );
};

export default LoginForm;
