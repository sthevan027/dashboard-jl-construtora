import { Button } from './button';

const ActionButton = ({ 
  variant = 'primary', 
  size = 'default', 
  icon: Icon, 
  children, 
  className = '',
  loading = false,
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = "transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg shadow-md";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700"
  };

  return (
    <Button
      variant="outline"
      size={size}
      className={`${baseClasses} ${variantClasses[variant]} border-0 ${className}`}
      onClick={onClick}
      loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 inline mr-2" />}
      {children}
    </Button>
  );
};

export { ActionButton };
