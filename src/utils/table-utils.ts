export function formatDate(date: string | Date): string {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

export function globalFilter<T extends Record<string, any>>(
    data: T[],
    searchTerm: string,
    searchableKeys: (keyof T)[],
): T[] {
    if (!searchTerm.trim()) return data

    const lowerSearch = searchTerm.toLowerCase()

    return data.filter((item) => {
        return searchableKeys.some((key) => {
            const value = item[key]
            if (value === null || value === undefined) return false
            return String(value).toLowerCase().includes(lowerSearch)
        })
    })
}

export function createPaginationRange(
    currentPage: number,
    totalPages: number,
    maxVisible: number = 5,
): (number | string)[] {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const range: (number | string)[] = []
    const leftSiblingIndex = Math.max(currentPage - 1, 1)
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    range.push(1)

    if (shouldShowLeftDots) {
        range.push('...')
    } else if (leftSiblingIndex === 2) {
        range.push(2)
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) {
            range.push(i)
        }
    }

    if (shouldShowRightDots) {
        range.push('...')
    } else if (rightSiblingIndex === totalPages - 1) {
        range.push(totalPages - 1)
    }

    if (totalPages !== 1) {
        range.push(totalPages)
    }

    return range
}
