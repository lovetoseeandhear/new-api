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

import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Spin } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { API, showError, showSuccess, verifyJSON } from '../../../helpers';

const DEFAULT_MEDIA_RATIO = `{
  "image": {
    "models": {}
  },
  "video": {
    "models": {}
  }
}`;

export default function MediaRatioSettings(props) {
  const { t } = useTranslation();
  const refForm = useRef();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    MediaRatio: DEFAULT_MEDIA_RATIO,
  });

  useEffect(() => {
    const currentInputs = {
      MediaRatio: props.options?.MediaRatio || DEFAULT_MEDIA_RATIO,
    };
    setInputs(currentInputs);
    refForm.current?.setValues(currentInputs);
  }, [props.options]);

  async function onSubmit() {
    try {
      await refForm.current.validate();
      setLoading(true);
      const res = await API.put('/api/option/', {
        key: 'MediaRatio',
        value: inputs.MediaRatio,
      });
      if (res.data.success) {
        showSuccess(t('保存成功'));
        props.refresh();
      } else {
        showError(res.data.message);
      }
    } catch (error) {
      showError(t('请检查输入'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Spin spinning={loading}>
      <Form
        values={inputs}
        getFormApi={(formAPI) => (refForm.current = formAPI)}
        style={{ marginBottom: 15 }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={18}>
            <Form.TextArea
              label={t('媒体规格倍率')}
              extraText={t(
                '图片和视频按尺寸、质量、分辨率、时长计费的倍率设置，键为映射后的模型名称',
              )}
              placeholder={t(
                '为一个 JSON 文本，例如：{"image":{"models":{"gpt-image-2":{"size_ratios":{"1024x1024":1,"2048x2048":4}}}},"video":{"models":{"veo-3.1":{"billing_mode":"per_second","default_duration_seconds":8,"default_resolution":"720p","resolution_ratios":{"720p":1,"1080p":1.8,"4k":4}}}}}',
              )}
              field='MediaRatio'
              autosize={{ minRows: 14, maxRows: 28 }}
              trigger='blur'
              stopValidateWithError
              rules={[
                {
                  validator: (rule, value) => verifyJSON(value),
                  message: '不是合法的 JSON 字符串',
                },
              ]}
              onChange={(value) => setInputs({ MediaRatio: value })}
            />
          </Col>
        </Row>
      </Form>
      <Button onClick={onSubmit}>{t('保存媒体规格倍率')}</Button>
    </Spin>
  );
}
