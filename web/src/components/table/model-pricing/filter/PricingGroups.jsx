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

import React, { useMemo, useState } from 'react';

/**
 * 分组筛选组件
 * @param {string} filterGroup 当前选中的分组，'all' 表示不过滤
 * @param {Function} setFilterGroup 设置选中分组
 * @param {Record<string, any>} usableGroup 后端返回的可用分组对象
 * @param {Record<string, number>} groupRatio 分组倍率对象
 * @param {Array} models 模型列表
 * @param {boolean} loading 是否加载中
 * @param {Function} t i18n
 */
const PricingGroups = ({
  filterGroup,
  setFilterGroup,
  usableGroup = {},
  groupRatio = {},
  models = [],
  loading = false,
  t,
}) => {
  const [searchText, setSearchText] = useState('');

  const totalGroups = useMemo(
    () => Object.keys(usableGroup).filter((key) => key && key !== 'all').length,
    [usableGroup],
  );

  const items = useMemo(() => {
    const groups = ['all', ...Object.keys(usableGroup).filter((key) => key !== '')];
    return groups.map((g) => {
      const modelCount =
        g === 'all'
          ? models.length
          : models.filter((m) => m.enable_groups && m.enable_groups.includes(g))
              .length;

      const rawRatio = g === 'all' ? null : groupRatio[g];
      const ratioNumber =
        rawRatio !== undefined && rawRatio !== null && !Number.isNaN(Number(rawRatio))
          ? Number(rawRatio)
          : 1;
      const ratioDisplay = g === 'all' ? t('全部') : `${ratioNumber}x`;
      const rawLabel = g === 'all' ? t('全部分组') : g;
      const isNonSubscription =
        g !== 'all' &&
        /(非订阅|non[-_\s]?subscription)/i.test(String(g || ''));
      const displayLabel =
        g === 'all'
          ? rawLabel
          : rawLabel
              .replace(/非订阅/gi, '')
              .replace(/\s{2,}/g, ' ')
              .replace(/^[\s_\-()（）]+|[\s_\-()（）]+$/g, '')
              .trim() || rawLabel;

      return {
        value: g,
        label: rawLabel,
        displayLabel,
        ratioNumber,
        ratioDisplay,
        isNonSubscription,
        modelCount,
      };
    });
  }, [groupRatio, models, t, usableGroup]);

  const visibleItems = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) {
      return items;
    }
    const allItem = items.find((item) => item.value === 'all');
    const filtered = items.filter((item) => {
      if (item.value === 'all') return false;
      return (
        String(item.displayLabel || '').toLowerCase().includes(keyword) ||
        String(item.label || '').toLowerCase().includes(keyword)
      );
    });
    return allItem ? [allItem, ...filtered] : filtered;
  }, [items, searchText]);

  if (loading) {
    return (
      <section className='pricing-filter-card pricing-filter-card-groups'>
        <div className='pricing-groups-panel-header'>
          <div className='pricing-groups-panel-heading'>
            <div className='pricing-filter-card-title'>{t('可用令牌分组')}</div>
            <span className='pricing-groups-total'>{`${totalGroups}${t('个')}`}</span>
          </div>
        </div>
        <div className='pricing-groups-search'>
          <input
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={t('搜索分组')}
            aria-label={t('搜索分组')}
          />
        </div>
        <div className='pricing-group-grid pricing-group-grid-office'>
          {Array.from({ length: 10 }).map((_, idx) => (
            <span
              key={`group-loading-${idx}`}
              className='pricing-filter-loading-tile'
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='pricing-filter-card pricing-filter-card-groups'>
      <div className='pricing-groups-panel-header'>
        <div className='pricing-groups-panel-heading'>
          <div className='pricing-filter-card-title'>{t('可用令牌分组')}</div>
          <span className='pricing-groups-total'>{`${totalGroups}${t('个')}`}</span>
        </div>
      </div>
      <div className='pricing-groups-search'>
        <input
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t('搜索分组')}
          aria-label={t('搜索分组')}
        />
      </div>
      <div className='pricing-group-grid pricing-group-grid-office'>
        {visibleItems.map((item) => {
          const isActive = filterGroup === item.value;
          const isEmpty = Number(item.modelCount || 0) === 0;
          const ratioKind =
            item.value === 'all'
              ? 'all'
              : item.ratioNumber === 1
                ? 'equal'
                : item.ratioNumber < 1
                  ? 'low'
                  : 'high';
          return (
            <button
              key={item.value}
              type='button'
              className='pricing-group-tile'
              data-active={isActive ? 'true' : undefined}
              data-empty={isEmpty ? 'true' : undefined}
              data-ratio-kind={ratioKind}
              data-non-subscription={
                item.isNonSubscription ? 'true' : undefined
              }
              onClick={() => setFilterGroup(item.value)}
            >
              {item.isNonSubscription && (
                <span className='pricing-group-subscription-badge'>
                  {t('非订阅')}
                </span>
              )}
              <span className='pricing-group-tile-name'>{item.displayLabel}</span>
              <span className='pricing-group-ratio-badge'>
                {item.value === 'all'
                  ? `${item.modelCount}`
                  : item.ratioDisplay}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PricingGroups;
