import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface UseScrollRememberReturns {
  resumePosition(): void
}

export const useScrollRemember = (): UseScrollRememberReturns => {
  const router = useRouter()
  const id = 'lastScroll/' + router.pathname

  // Store last scroll position so we can return to it when we load the page next time
  useEffect(() => {
    const handler = () => {
      localStorage.setItem(id, window.pageYOffset.toString())
    }

    const unloadHandler = () => {
      localStorage.setItem(id, '0')
    }

    window.addEventListener('beforeunload', unloadHandler)

    router.events.on('beforeHistoryChange', handler)
    return () => {
      router.events.off('beforeHistoryChange', handler)
      window.removeEventListener('beforeunload', unloadHandler)
    }
  }, [router.events, id])

  const resumePosition = () => {
    window.scrollTo(0, parseInt(localStorage.getItem(id) || '0'))
  }

  return {
    resumePosition,
  }
}
