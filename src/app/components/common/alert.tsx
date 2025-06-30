import React, { useEffect, useState } from 'react';

type AlertProps = {
  message?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
  autoDismiss?: number; // milliseconds until auto-dismiss
  show?: boolean; // control visibility from parent
};

const Alert: React.FC<AlertProps> = ({
  message = 'Your changes have been saved successfully!',
  variant = 'success',
  onClose,
  className = '',
  autoDismiss,
  show = true,
}) => {
  useEffect(() => {
    if (autoDismiss && show) {
      const timer = setTimeout(() => {
        onClose?.(); // Let parent handle visibility
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, show, onClose]);

  if (!show) return null;

  const variantStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
      <div className={`absolute top-0 left-0 right-0 z-50 ${className}`}>
      <div
        className={`border-l-4 p-4 rounded ${variantStyles[variant]} mx-auto max-w-md md:max-w-2xl w-full shadow-lg`}
        role="alert"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">Changes Saved Successfully!</p>
            <p>{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-lg font-semibold focus:outline-none"
              aria-label="Close alert"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;