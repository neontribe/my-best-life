/**
 * useRemember is a hook that will store a given value when the page is navigated
 * away from, allowing the value to be retrieved when the page is visited again through
 * the `recall` function.
 *
 * `name` must be a unique identifier for the information to be remembered.
 *
 * For the `value`, you need to pass a function which returns the value you want to be saved.
 */

import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface ValueFunction {
  (): string
}

interface UseRememberOptions {
  name: string
  value: ValueFunction
}

interface IUseRemember {
  (opts: UseRememberOptions): {
    recall(): string | null
    forget(): void
  }
}

export const useRemember: IUseRemember = ({ name, value }) => {
  const router = useRouter()
  const id = 'remember/' + router.pathname + '/' + name

  useEffect(() => {
    const onLeavePage = () => {
      localStorage.setItem(id, value())
    }

    const onLeaveWebsite = () => {
      const remembered = Object.keys(localStorage).filter((key) => {
        return key.split('/')[0] === 'remember'
      })

      remembered.forEach((key) => {
        localStorage.removeItem(key)
      })
    }

    router.events.on('beforeHistoryChange', onLeavePage)
    window.addEventListener('beforeunload', onLeaveWebsite)

    return () => {
      router.events.off('beforeHistoryChange', onLeavePage)
      window.removeEventListener('beforeunload', onLeaveWebsite)
    }
  }, [router.events, id, value])

  const recall = () => {
    return localStorage.getItem(id)
  }

  const forget = () => {
    localStorage.removeItem(id)
  }

  return {
    recall,
    forget,
  }
}
