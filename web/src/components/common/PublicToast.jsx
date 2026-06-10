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

import React, { useEffect, useState } from 'react';

const PublicToast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const onToast = (event) => {
      const detail = event.detail || {};
      setToast({
        message: detail.message,
        type: detail.type || 'info',
      });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setToast(null), 3200);
    };

    window.addEventListener('flowbay-public-toast', onToast);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('flowbay-public-toast', onToast);
    };
  }, []);

  if (!toast?.message) return null;

  return (
    <div className={`public-toast public-toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default PublicToast;
