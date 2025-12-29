import {
    parseAsInteger,
    parseAsString,
    useQueryState,
} from 'nuqs'

export const useTableParams = (
    defaults: {
        page?: number
        pageSize?: number
        orderBy?: string
    } = {},
) => {
    const [page, setPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(defaults.page ?? 1),
    )

    const [pageSize, setPageSize] = useQueryState(
        'page_size',
        parseAsInteger.withDefault(defaults.pageSize ?? 10),
    )

    const [search, setSearch] = useQueryState(
        'search',
        parseAsString.withDefault(''),
    )

    const setPageParams = (newPage: number) => {
        setPage(newPage)
    }

    const setPageSizeParams = (newSize: number) => {
        setPageSize(newSize)
        setPage(1) // Reset to first page when changing page size
    }

    const setSearchParams = (newSearch: string | null) => {
        setSearch(newSearch)
        setPage(1) // Reset to first page when searching
    }

    return {
        page,
        setPage: setPageParams,
        pageSize,
        setPageSize: setPageSizeParams,
        search,
        setSearch: setSearchParams,
    }
}
