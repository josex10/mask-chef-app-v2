import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

/**
 * Wrapper around `router.refresh()` from `next/navigation` `useRouter()` to return Promise, and resolve after refresh completed
 * @returns Refresh function
 */
export function useRouterPush() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const [resolve, setResolve] = useState<((value: unknown) => void) | null>(null)
    const [isTriggered, setIsTriggered] = useState(false)

    const routerPush = (newUrl: string) => {
        return new Promise((resolve, reject) => {
            setResolve(() => resolve)
            startTransition(() => {
                if(newUrl) router.push(newUrl, { scroll: false })
            })
        })
    }

    useEffect(() => {
        if (isTriggered && !isPending) {
            if (resolve) {
                resolve(null)
                
                setIsTriggered(false)
                setResolve(null)
            }
        }
        if (isPending) {
            setIsTriggered(true)
        }

    }, [isTriggered, isPending, resolve])

    return routerPush
}