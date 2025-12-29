export const exportToCSV = <T extends Record<string, any>>(
    data: T[],
    filename: string,
    columns?: { key: keyof T; label: string }[]
) => {
    if (!data || data.length === 0) {
        console.warn('No data to export')
        return
    }

    const keys = columns
        ? columns.map((col) => col.key)
        : (Object.keys(data[0]) as (keyof T)[])

    const headers = columns
        ? columns.map((col) => col.label)
        : keys.map((key) => String(key))

    const csvContent = [
        headers.join(','),
        ...data.map((row) =>
            keys
                .map((key) => {
                    const value = row[key]
                    // Handle null/undefined
                    if (value === null || value === undefined) return ''
                    // Handle strings containing commas or quotes
                    const stringValue = String(value)
                    if (stringValue.includes(',') || stringValue.includes('"')) {
                        return `"${stringValue.replace(/"/g, '""')}"`
                    }
                    return stringValue
                })
                .join(',')
        ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
