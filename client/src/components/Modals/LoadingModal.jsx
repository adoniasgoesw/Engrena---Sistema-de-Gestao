import React from 'react';
import { FaCog } from 'react-icons/fa';

const LoadingModal = ({ isLoading, status, message }) => {
  const getColor = () => {
    if (status === 'success') return 'text-green-500';
    if (status === 'error') return 'text-red-500';
    return 'text-gray-400';
  };

  return isLoading || status ? (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999]">
      <div className="  p-6 rounded-2xl  flex flex-col items-center gap-4 max-w-[90%] w-[320px] text-center">
        <FaCog className={`animate-spin text-6xl ${getColor()}`} />
        {message && (
          <p className="text-white text-base font-medium leading-snug">
            {message}
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default LoadingModal;
