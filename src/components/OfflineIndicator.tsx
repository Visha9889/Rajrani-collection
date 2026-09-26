import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, t } = useApp();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-bounce">
      <WifiOff className="h-4 w-4" />
      <span>{t('offlineNotice')}</span>
    </div>
  );
};
