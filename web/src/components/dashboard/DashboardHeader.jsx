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
import { Button } from '@douyinfe/semi-ui';
import { RefreshCw, Search } from 'lucide-react';

const DashboardHeader = ({
  getGreeting,
  greetingVisible,
  showSearchModal,
  refresh,
  loading,
  t,
}) => {
  const HEADER_BUTTON_CLASS =
    'dashboard-plaza-header-btn !rounded-xl !border-0 transition-all duration-200';

  return (
    <div className='dashboard-plaza-header mb-4 flex items-center justify-between gap-3'>
      <h2
        className='dashboard-plaza-greeting text-2xl font-semibold transition-opacity duration-1000 ease-in-out'
        style={{ opacity: greetingVisible ? 1 : 0 }}
      >
        {getGreeting}
      </h2>
      <div className='dashboard-plaza-header-actions flex gap-2 md:gap-3'>
        <Button
          type='tertiary'
          icon={<Search size={16} />}
          onClick={showSearchModal}
          className={`dashboard-plaza-header-btn-search ${HEADER_BUTTON_CLASS}`}
          aria-label={t('搜索')}
        />
        <Button
          type='tertiary'
          icon={<RefreshCw size={16} />}
          onClick={refresh}
          loading={loading}
          className={`dashboard-plaza-header-btn-refresh ${HEADER_BUTTON_CLASS}`}
          aria-label={t('刷新')}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
