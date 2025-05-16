
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
};

export const formatNumber = (num: number, decimals = 2): string => {
  if (num === null || isNaN(num)) return '0';
  
  if (Math.abs(num) < 0.01 && num !== 0) {
    return '<0.01';
  }
  
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  };
  
  return new Intl.NumberFormat('en-US', options).format(num);
};

export const formatCurrency = (amount: number, currency = 'USD', decimals = 2): string => {
  if (amount === null || isNaN(amount)) return `$0`;
  
  const options = {
    style: 'currency' as const,
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  };
  
  if (Math.abs(amount) < 0.01 && amount !== 0) {
    return '<$0.01';
  }
  
  return new Intl.NumberFormat('en-US', options).format(amount);
};

export const formatTokenAmount = (amount: number, decimals = 8): string => {
  if (amount === null || isNaN(amount)) return '0';
  
  // For very small numbers, show more decimals
  if (amount < 0.000001 && amount !== 0) {
    return amount.toExponential(2);
  }
  
  // For small numbers, adjust decimals
  if (amount < 0.01 && amount !== 0) {
    return amount.toFixed(6);
  }
  
  // For regular numbers, use standard formatting
  return formatNumber(amount, decimals);
};

export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
