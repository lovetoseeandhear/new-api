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

import React, { useEffect, useState, useRef } from 'react';
import { Banner, Button, Form, Row, Col, Spin } from '@douyinfe/semi-ui';
import {
  API,
  removeTrailingSlash,
  showError,
  showSuccess,
} from '../../../helpers';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';

const toBoolean = (value) => value === true || value === 'true';

export default function SettingsPaymentGatewayAlipay(props) {
  const { t } = useTranslation();
  const sectionTitle = props.hideSectionTitle ? undefined : t('支付宝设置');
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    AlipayEnabled: false,
    AlipaySandbox: false,
    AlipayAppID: '',
    AlipayPrivateKey: '',
    AlipayPublicKey: '',
    AlipayNotifyURL: '',
    AlipayReturnURL: '',
    AlipaySubscriptionReturnURL: '',
    AlipayGatewayURL: '',
    AlipaySandboxGatewayURL: '',
  });
  const formApiRef = useRef(null);

  useEffect(() => {
    if (props.options && formApiRef.current) {
      const currentInputs = {
        AlipayEnabled: toBoolean(props.options.AlipayEnabled),
        AlipaySandbox: toBoolean(props.options.AlipaySandbox),
        AlipayAppID: props.options.AlipayAppID || '',
        AlipayPrivateKey: props.options.AlipayPrivateKey || '',
        AlipayPublicKey: props.options.AlipayPublicKey || '',
        AlipayNotifyURL: props.options.AlipayNotifyURL || '',
        AlipayReturnURL: props.options.AlipayReturnURL || '',
        AlipaySubscriptionReturnURL:
          props.options.AlipaySubscriptionReturnURL || '',
        AlipayGatewayURL: props.options.AlipayGatewayURL || '',
        AlipaySandboxGatewayURL: props.options.AlipaySandboxGatewayURL || '',
      };
      setInputs(currentInputs);
      formApiRef.current.setValues(currentInputs);
    }
  }, [props.options]);

  const handleFormChange = (values) => {
    setInputs(values);
  };

  const submitAlipaySetting = async () => {
    if (props.options.ServerAddress === '') {
      showError(t('请先填写服务器地址'));
      return;
    }

    setLoading(true);
    try {
      const options = [
        {
          key: 'AlipayEnabled',
          value: inputs.AlipayEnabled ? 'true' : 'false',
        },
        {
          key: 'AlipaySandbox',
          value: inputs.AlipaySandbox ? 'true' : 'false',
        },
        {
          key: 'AlipayAppID',
          value: inputs.AlipayAppID || '',
        },
        {
          key: 'AlipayNotifyURL',
          value: removeTrailingSlash(inputs.AlipayNotifyURL || ''),
        },
        {
          key: 'AlipayReturnURL',
          value: removeTrailingSlash(inputs.AlipayReturnURL || ''),
        },
        {
          key: 'AlipaySubscriptionReturnURL',
          value: removeTrailingSlash(inputs.AlipaySubscriptionReturnURL || ''),
        },
        {
          key: 'AlipayGatewayURL',
          value: removeTrailingSlash(inputs.AlipayGatewayURL || ''),
        },
        {
          key: 'AlipaySandboxGatewayURL',
          value: removeTrailingSlash(inputs.AlipaySandboxGatewayURL || ''),
        },
      ];

      if (inputs.AlipayPrivateKey && inputs.AlipayPrivateKey !== '') {
        options.push({
          key: 'AlipayPrivateKey',
          value: inputs.AlipayPrivateKey,
        });
      }
      if (inputs.AlipayPublicKey && inputs.AlipayPublicKey !== '') {
        options.push({
          key: 'AlipayPublicKey',
          value: inputs.AlipayPublicKey,
        });
      }

      const results = await Promise.all(
        options.map((option) =>
          API.put('/api/option/', {
            key: option.key,
            value: option.value,
          }),
        ),
      );

      const errorResults = results.filter((res) => !res.data.success);
      if (errorResults.length === 0) {
        showSuccess(t('更新成功'));
        props.refresh?.();
      } else {
        errorResults.forEach((res) => {
          showError(res.data.message);
        });
      }
    } catch (error) {
      showError(t('更新失败'));
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Form
        initValues={inputs}
        onValueChange={handleFormChange}
        getFormApi={(api) => (formApiRef.current = api)}
      >
        <Form.Section text={sectionTitle}>
          <Banner
            type='info'
            icon={<BookOpen size={16} />}
            description={
              <>
                {t('请在支付宝开放平台创建电脑网站支付应用，并配置异步通知地址。')}
                <br />
                {t('默认通知地址')}：
                {props.options.ServerAddress
                  ? `${removeTrailingSlash(props.options.ServerAddress)}/api/alipay/notify`
                  : '/api/alipay/notify'}
              </>
            }
            style={{ marginBottom: 16 }}
          />

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Switch
                field='AlipayEnabled'
                checkedText='｜'
                uncheckedText='〇'
                label={t('启用支付宝直连')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Switch
                field='AlipaySandbox'
                checkedText='｜'
                uncheckedText='〇'
                label={t('启用支付宝沙箱')}
              />
            </Col>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}
            style={{ marginTop: 16 }}
          >
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayAppID'
                label={t('支付宝 AppID')}
                placeholder={t('例如：2021000xxxx')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayPrivateKey'
                label={t('应用私钥')}
                placeholder={t('PKCS8 格式，留空表示保持当前不变')}
                type='password'
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayPublicKey'
                label={t('支付宝公钥')}
                placeholder={t('留空表示保持当前不变')}
                type='password'
              />
            </Col>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}
            style={{ marginTop: 16 }}
          >
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayNotifyURL'
                label={t('异步通知地址（可选）')}
                placeholder={t('留空则自动使用 /api/alipay/notify')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayReturnURL'
                label={t('充值回跳地址（可选）')}
                placeholder={t('留空则自动使用 /console/topup')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipaySubscriptionReturnURL'
                label={t('订阅回跳地址（可选）')}
                placeholder={t('留空则自动使用充值回跳地址')}
              />
            </Col>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}
            style={{ marginTop: 16 }}
          >
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='AlipayGatewayURL'
                label={t('正式网关地址（可选）')}
                placeholder='https://openapi.alipay.com/gateway.do'
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='AlipaySandboxGatewayURL'
                label={t('沙箱网关地址（可选）')}
                placeholder='https://openapi-sandbox.dl.alipaydev.com/gateway.do'
              />
            </Col>
          </Row>

          <Button onClick={submitAlipaySetting} style={{ marginTop: 16 }}>
            {t('更新支付宝设置')}
          </Button>
        </Form.Section>
      </Form>
    </Spin>
  );
}
