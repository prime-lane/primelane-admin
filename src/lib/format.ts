export const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return '₦0'
    return `₦${amount.toLocaleString()}`
}

export const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return '0'
    return num.toLocaleString()
}
