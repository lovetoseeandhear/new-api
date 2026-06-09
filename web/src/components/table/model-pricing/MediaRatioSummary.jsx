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

import React from 'react';
import { Tag, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const hasEntries = (value) => value && Object.keys(value).length > 0;

const mapToItems = (source, suffix = 'x') => {
  if (!hasEntries(source)) return [];
  return Object.entries(source).map(([key, value]) => ({
    key,
    label: key,
    value: `${value}${suffix}`,
  }));
};

const pushValue = (items, key, label, value) => {
  if (value === undefined || value === null || value === '') return;
  items.push({ key, label, value });
};

const buildImageSections = (image, t) => {
  if (!image) return [];
  const defaults = [];
  pushValue(defaults, 'default_size', t('默认尺寸'), image.default_size);
  pushValue(defaults, 'default_quality', t('默认质量'), image.default_quality);
  pushValue(
    defaults,
    'unknown_spec_policy',
    t('缺省策略'),
    image.unknown_spec_policy,
  );

  return [
    { key: 'image-defaults', title: t('图片默认规则'), items: defaults },
    {
      key: 'image-size',
      title: t('图片尺寸倍率'),
      items: mapToItems(image.size_ratios),
    },
    {
      key: 'image-quality',
      title: t('图片质量倍率'),
      items: mapToItems(image.quality_ratios),
    },
    {
      key: 'image-overrides',
      title: t('图片组合覆盖'),
      items: mapToItems(image.size_quality_overrides),
    },
  ].filter((section) => section.items.length > 0);
};

const buildVideoSections = (video, t) => {
  if (!video) return [];
  const defaults = [];
  pushValue(defaults, 'billing_mode', t('计费模式'), video.billing_mode);
  pushValue(
    defaults,
    'default_duration_seconds',
    t('默认秒数'),
    video.default_duration_seconds
      ? `${video.default_duration_seconds}${t('秒')}`
      : '',
  );
  pushValue(
    defaults,
    'default_resolution',
    t('默认分辨率'),
    video.default_resolution,
  );
  pushValue(
    defaults,
    'unknown_spec_policy',
    t('缺省策略'),
    video.unknown_spec_policy,
  );

  return [
    { key: 'video-defaults', title: t('视频默认规则'), items: defaults },
    {
      key: 'video-resolution',
      title: t('视频分辨率倍率'),
      items: mapToItems(video.resolution_ratios),
    },
    {
      key: 'video-size',
      title: t('视频尺寸倍率'),
      items: mapToItems(video.size_ratios),
    },
  ].filter((section) => section.items.length > 0);
};

const getSections = (mediaRatio, t) => [
  ...buildImageSections(mediaRatio?.image, t),
  ...buildVideoSections(mediaRatio?.video, t),
];

export default function MediaRatioSummary({
  mediaRatio,
  t,
  variant = 'inline',
}) {
  const sections = getSections(mediaRatio, t);
  if (sections.length === 0) return null;

  const compact = variant === 'inline' || variant === 'card';
  const maxItems = variant === 'inline' ? 4 : 8;

  return (
    <div
      className={
        compact
          ? 'mt-2 space-y-1'
          : 'mt-3 rounded-xl border border-[var(--semi-color-border)] p-3 bg-[var(--semi-color-fill-0)]'
      }
    >
      <div className='text-xs font-semibold text-gray-600'>
        {t('媒体规格计费')}
      </div>
      <div className='space-y-2'>
        {sections.map((section) => {
          const visibleItems = compact
            ? section.items.slice(0, maxItems)
            : section.items;
          const hiddenCount = section.items.length - visibleItems.length;
          return (
            <div key={section.key} className='space-y-1'>
              <Text size='small' type='tertiary'>
                {section.title}
              </Text>
              <div className='flex flex-wrap gap-1'>
                {visibleItems.map((item) => (
                  <Tag key={item.key} color='white' size='small' shape='circle'>
                    {item.label}: {item.value}
                  </Tag>
                ))}
                {hiddenCount > 0 && (
                  <Tag color='grey' size='small' shape='circle'>
                    +{hiddenCount}
                  </Tag>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
