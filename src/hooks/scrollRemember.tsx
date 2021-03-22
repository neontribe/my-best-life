import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface UseScrollRememberReturns {
  resumePosition(): void,
}

export const useScrollRemember = (): UseScrollRememberReturns => {
  const router = useRouter()

  // Store last scroll position so we can return to it when we load the page next time
  useEffect(() => {
    const handler = () => {
      localStorage.setItem('lastScroll/' + router.pathname, window.pageYOffset.toString())
    }

    router.events.on('beforeHistoryChange', handler)
    return () => {
      router.events.off('beforeHistoryChange', handler)
    }
  }, [router.events, router.pathname])

  const resumePosition = () => {
    window.scrollTo(0, parseInt(localStorage.getItem('lastScroll/' + router.pathname) || '0'))
  }

  return {
    resumePosition
  }
}