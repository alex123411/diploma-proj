import { useState } from "react"

export const usePagination = (initialLimit: number) => {

    const [limit, setLimit] = useState(initialLimit)
    const [page, setPage] = useState(1)

    const changePage = (page: number) => {
        setPage(page)
    }

    const changeLimit = (limit: number) => {
        setLimit(limit)
    }

    return [changeLimit, limit, changePage, page] as const
}