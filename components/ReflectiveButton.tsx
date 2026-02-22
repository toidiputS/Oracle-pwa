import React from 'react';

interface ReflectiveButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    info?: string; // Maps to data-oracle-info for the autonomous companion
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
}

/**
 * THE REFLECTIVE BUTTON
 * An elite UI component that features a physical "floor" reflection using -webkit-box-reflect.
 * Designed for high-ticket interfaces and sovereign command centers.
 */
export const ReflectiveButton: React.FC<ReflectiveButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    info,
    disabled = false,
    type = 'button',
    fullWidth = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                btn-reflect-base 
                btn-reflect-${variant} 
                ${fullWidth ? 'w-full' : ''} 
                ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : ''} 
                ${className}
            `}
            data-oracle-info={info}
        >
            <span className="btn-content">
                {children}
            </span>
        </button>
    );
};
