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

import React, { lazy, Suspense } from 'react';
import { Card, Avatar, Skeleton, Tag } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VChart = lazy(() =>
  import('@visactor/react-vchart').then((module) => ({ default: module.VChart })),
);

const MiniChartFallback = () => (
  <div className='dashboard-plaza-chart-skeleton h-full w-full' />
);

const StatsCards = ({
  groupedStatsData,
  loading,
  getTrendSpec,
  CARD_PROPS,
  CHART_CONFIG,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='dashboard-plaza-stats-section mb-4'>
      <div className='dashboard-plaza-stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {groupedStatsData.map((group, idx) => (
          <Card
            key={idx}
            {...CARD_PROPS}
            className={`dashboard-plaza-stat-card dashboard-plaza-stat-card-${idx % 4} ${group.color} border-0 !rounded-2xl w-full`}
            title={group.title}
          >
            <div className='dashboard-plaza-stat-card-content space-y-4'>
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className='dashboard-plaza-stat-item flex items-center justify-between cursor-pointer'
                  onClick={item.onClick}
                >
                  <div className='dashboard-plaza-stat-item-main flex items-center min-w-0'>
                    <Avatar
                      className='dashboard-plaza-stat-avatar mr-3'
                      size='small'
                      color={item.avatarColor}
                    >
                      {item.icon}
                    </Avatar>
                    <div className='min-w-0'>
                      <div className='dashboard-plaza-stat-item-title text-xs'>
                        {item.title}
                      </div>
                      <div className='dashboard-plaza-stat-item-value text-lg font-semibold'>
                        <Skeleton
                          loading={loading}
                          active
                          placeholder={
                            <Skeleton.Paragraph
                              active
                              rows={1}
                              style={{
                                width: '65px',
                                height: '24px',
                                marginTop: '4px',
                              }}
                            />
                          }
                        >
                          {item.value}
                        </Skeleton>
                      </div>
                    </div>
                  </div>
                  {item.title === t('当前余额') ? (
                    <Tag
                      className='dashboard-plaza-stat-tag'
                      color='white'
                      shape='circle'
                      size='large'
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/console/topup');
                      }}
                    >
                      {t('充值')}
                    </Tag>
                  ) : (
                    (loading ||
                      (item.trendData && item.trendData.length > 0)) && (
                      <div className='w-24 h-10'>
                        <div className='dashboard-plaza-stat-chart h-full w-full'>
                          <Suspense fallback={<MiniChartFallback />}>
                            <VChart
                              spec={getTrendSpec(item.trendData, item.trendColor)}
                              option={CHART_CONFIG}
                            />
                          </Suspense>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
