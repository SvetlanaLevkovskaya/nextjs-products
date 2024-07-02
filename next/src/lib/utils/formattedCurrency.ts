export const formatCurrency = (value: string | number): string => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value)
  return `${numericValue.toFixed(2)} р.`
}
