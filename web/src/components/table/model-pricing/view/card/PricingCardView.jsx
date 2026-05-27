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
import {
  Card,
  Tag,
  Tooltip,
  Checkbox,
  Empty,
  Pagination,
  Button,
  Avatar,
} from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import { Copy } from 'lucide-react';
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from '@douyinfe/semi-illustrations';
import {
  stringToColor,
  calculateModelPrice,
  formatPriceInfo,
  getLobeHubIcon,
} from '../../../../../helpers';
import PricingCardSkeleton from './PricingCardSkeleton';
import { useMinimumLoadingTime } from '../../../../../hooks/common/useMinimumLoadingTime';
import { renderLimitedItems } from '../../../../common/ui/RenderUtils';
import { useIsMobile } from '../../../../../hooks/common/useIsMobile';
import { getDiscountZheByGroupRatio } from '../../discount';

const CARD_STYLES = {
  container: 'pricing-card-icon-wrap',
  icon: 'w-8 h-8 flex items-center justify-center',
};

const PricingCardView = ({
  filteredModels,
  loading,
  rowSelection,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  selectedGroup,
  groupRatio,
  copyText,
  setModalImageUrl,
  setIsModalOpenurl,
  currency,
  siteDisplayType,
  tokenUnit,
  displayPrice,
  showRatio,
  t,
  selectedRowKeys = [],
  setSelectedRowKeys,
  openModelDetail,
}) => {
  const showSkeleton = useMinimumLoadingTime(loading);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedModels = filteredModels.slice(
    startIndex,
    startIndex + pageSize,
  );
  const getModelKey = (model) => model.key ?? model.model_name ?? model.id;
  const isMobile = useIsMobile();

  const handleCheckboxChange = (model, checked) => {
    if (!setSelectedRowKeys) return;
    const modelKey = getModelKey(model);
    const newKeys = checked
      ? Array.from(new Set([...selectedRowKeys, modelKey]))
      : selectedRowKeys.filter((key) => key !== modelKey);
    setSelectedRowKeys(newKeys);
    rowSelection?.onChange?.(newKeys, null);
  };

  // 获取模型图标
  const getModelIcon = (model) => {
    if (!model || !model.model_name) {
      return (
        <div className={CARD_STYLES.container}>
          <Avatar size='large'>?</Avatar>
        </div>
      );
    }
    // 1) 优先使用模型自定义图标
    if (model.icon) {
      return (
        <div className={CARD_STYLES.container}>
          <div className={CARD_STYLES.icon}>
            {getLobeHubIcon(model.icon, 32)}
          </div>
        </div>
      );
    }
    // 2) 退化为供应商图标
    if (model.vendor_icon) {
      return (
        <div className={CARD_STYLES.container}>
          <div className={CARD_STYLES.icon}>
            {getLobeHubIcon(model.vendor_icon, 32)}
          </div>
        </div>
      );
    }

    // 如果没有供应商图标，使用模型名称生成头像

    const avatarText = model.model_name.slice(0, 2).toUpperCase();
    return (
      <div className={CARD_STYLES.container}>
        <Avatar
          size='large'
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {avatarText}
        </Avatar>
      </div>
    );
  };

  // 获取模型描述
  const getModelDescription = (record) => {
    return record.description || '';
  };

  // 渲染标签 - 计费 + 折扣 + 自定义 三档质感
  const renderTags = (record, priceData) => {
    const tags = [];

    // 1. 计费 chip（实心）
    if (record.quota_type === 1) {
      tags.push(
        <Tag
          key='billing'
          shape='circle'
          size='small'
          className='pricing-chip pricing-chip-accent'
        >
          {t('按次计费')}
        </Tag>,
      );
    } else if (record.quota_type === 0) {
      tags.push(
        <Tag
          key='billing'
          shape='circle'
          size='small'
          className='pricing-chip pricing-chip-primary'
        >
          {t('按量计费')}
        </Tag>,
      );
    } else {
      tags.push(
        <Tag key='billing' shape='circle' size='small'>
          -
        </Tag>,
      );
    }

    // 2. 折扣 chip（实心，仅当 zhe 非空）
    const zhe = getDiscountZheByGroupRatio(priceData?.usedGroupRatio);
    if (zhe !== null) {
      tags.push(
        <Tag
          key='discount'
          shape='circle'
          size='small'
          className='pricing-chip pricing-chip-accent'
        >
          {zhe}
          {t('折')}
        </Tag>,
      );
    }

    // 3. 自定义 tag（描边 + 左色条，最多 3 个）
    const customTags = [];
    if (record.tags) {
      const tagArr = record.tags.split(',').filter(Boolean);
      tagArr.forEach((tg, idx) => {
        customTags.push(
          <Tag
            key={`custom-${idx}`}
            shape='circle'
            size='small'
            className='pricing-chip pricing-chip-neutral'
            style={{
              borderLeftWidth: '2px',
              borderLeftColor: stringToColor(tg),
            }}
          >
            {tg}
          </Tag>,
        );
      });
    }

    return (
      <div className='pricing-tags-row'>
        {tags}
        {customTags.length > 0 &&
          renderLimitedItems({
            items: customTags.map((tag, idx) => ({
              key: `custom-${idx}`,
              element: tag,
            })),
            renderItem: (item) => item.element,
            maxDisplay: 3,
          })}
      </div>
    );
  };

  // 显示骨架屏
  if (showSkeleton) {
    return (
      <PricingCardSkeleton
        rowSelection={!!rowSelection}
        showRatio={showRatio}
      />
    );
  }

  if (!filteredModels || filteredModels.length === 0) {
    return (
      <div className='flex justify-center items-center py-20'>
        <Empty
          image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
          darkModeImage={
            <IllustrationNoResultDark style={{ width: 150, height: 150 }} />
          }
          description={t('搜索无结果')}
        />
      </div>
    );
  }

  return (
    <div className='px-2 pt-2'>
      <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {paginatedModels.map((model, index) => {
          const modelKey = getModelKey(model);
          const isSelected = selectedRowKeys.includes(modelKey);

          const priceData = calculateModelPrice({
            record: model,
            selectedGroup,
            groupRatio,
            tokenUnit,
            displayPrice,
            currency,
            quotaDisplayType: siteDisplayType,
          });

          return (
            <Card
              key={modelKey || index}
              className='pricing-glass-card pricing-glass-card-enter !border-0 cursor-pointer'
              data-selected={isSelected || undefined}
              bodyStyle={{ height: '100%' }}
              onClick={() => openModelDetail && openModelDetail(model)}
            >
              <div className='flex flex-col h-full'>
                {/* 身份区：图标 + 模型名称 + 操作按钮 */}
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-start space-x-3 flex-1 min-w-0'>
                    {getModelIcon(model)}
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-base font-semibold truncate'>
                        {model.model_name}
                      </h3>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2 ml-3'>
                    {/* 复制按钮 */}
                    <Button
                      size='small'
                      theme='borderless'
                      type='tertiary'
                      icon={<Copy size={12} />}
                      className='!bg-[var(--plaza-primary)]/8 hover:!bg-[var(--plaza-primary)]/15 !text-[var(--plaza-primary)]'
                      onClick={(e) => {
                        e.stopPropagation();
                        copyText(model.model_name);
                      }}
                    />

                    {/* 选择框 */}
                    {rowSelection && (
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(model, e.target.checked);
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* 模型描述 - 占据剩余空间 */}
                <div className='flex-1 mb-4'>
                  <p className='text-xs line-clamp-2 leading-relaxed text-[var(--plaza-text-3)]'>
                    {getModelDescription(model)}
                  </p>
                </div>

                {/* 计价区 + 标签区 */}
                <div className='mt-auto'>
                  {/* 区段分隔线（计价区上方） */}
                  <div className='pricing-section-divider' />

                  {/* 计价区：价格信息 + 倍率 chip 行 */}
                  <div className='flex flex-col gap-1 text-xs pricing-mono text-[var(--plaza-text-2)]'>
                    {formatPriceInfo(priceData, t, siteDisplayType)}
                  </div>

                  {showRatio && (
                    <div className='pricing-ratio-row mt-2'>
                      {model.quota_type === 0 && (
                        <>
                          <span className='pricing-ratio-chip'>
                            <span className='pricing-ratio-chip-value'>
                              ×{model.model_ratio}
                            </span>
                            <span className='pricing-ratio-chip-label'>
                              {t('模型')}
                            </span>
                          </span>
                          <span className='pricing-ratio-chip'>
                            <span className='pricing-ratio-chip-value'>
                              ×{parseFloat(model.completion_ratio.toFixed(3))}
                            </span>
                            <span className='pricing-ratio-chip-label'>
                              {t('补全')}
                            </span>
                          </span>
                        </>
                      )}
                      <span className='pricing-ratio-chip'>
                        <span className='pricing-ratio-chip-value'>
                          ×{priceData?.usedGroupRatio ?? '-'}
                        </span>
                        <span className='pricing-ratio-chip-label'>
                          {t('分组')}
                        </span>
                      </span>
                      <span className='pricing-caption ml-auto inline-flex items-center gap-1'>
                        {t('倍率信息')}
                        <Tooltip
                          content={t('倍率是为了方便换算不同价格的模型')}
                        >
                          <IconHelpCircle
                            className='text-blue-500 cursor-pointer'
                            size='small'
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalImageUrl('/ratio.png');
                              setIsModalOpenurl(true);
                            }}
                          />
                        </Tooltip>
                      </span>
                    </div>
                  )}

                  {/* 区段分隔线（标签区上方） */}
                  <div className='pricing-section-divider' />

                  {/* 标签区：计费 + 折扣 + 自定义 */}
                  {renderTags(model, priceData)}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 分页 */}
      {filteredModels.length > 0 && (
        <div className='flex justify-center mt-6 py-4 border-t pricing-pagination-divider'>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={filteredModels.length}
            showSizeChanger={true}
            pageSizeOptions={[10, 20, 50, 100]}
            size={isMobile ? 'small' : 'default'}
            showQuickJumper={isMobile}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PricingCardView;
