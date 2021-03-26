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
    const onLeavePage = () => {
      localStorage.setItem(id, window.pageYOffset.toString())
    }

    const onLeaveWebsite = () => {
      const remembered = Object.keys(localStorage).filter((key) => {
        return key.split('/')[0] === 'lastScroll'
      })

      remembered.forEach((key) => {
        localStorage.setItem(key, '0')
      })
    }

    router.events.on('beforeHistoryChange', onLeavePage)
    window.addEventListener('beforeunload', onLeaveWebsite)

    return () => {
      router.events.off('beforeHistoryChange', onLeavePage)
      window.removeEventListener('beforeunload', onLeaveWebsite)
    }
  }, [router.events, id])

  const resumePosition = () => {
    window.scrollTo(0, parseInt(localStorage.getItem(id) || '0'))
  }

  return {
    resumePosition,
  }
}
