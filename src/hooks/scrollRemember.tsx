/**
 * Special case of useRemember for remembering scroll position on a page.
 */

import { useRemember } from './remember'

interface UseScrollRememberReturns {
  resumePosition(): void
  resetPosition(): void
}

export const useScrollRemember = (): UseScrollRememberReturns => {
  const { recall, forget } = useRemember({
    name: 'lastScroll',
    value: () => window.pageYOffset.toString(),
  })

  const resumePosition = () => {
    window.scrollTo(0, parseInt(recall() || '0'))
  }

  const resetPosition = () => {
    forget()
    window.scrollTo(0, 0)
  }

  return {
    resumePosition,
    resetPosition,
  }
}
