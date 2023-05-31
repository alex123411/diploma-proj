import { useState } from "react"

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (error: any) {
            setError(error.message)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const
}