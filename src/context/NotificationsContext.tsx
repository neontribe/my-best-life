import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'

interface NotificationOptions {
  msg: string
  time?: number
}

interface INotificationsContext {
  notify(options: NotificationOptions): void
}

interface NotificationProps {
  options: NotificationOptions
  onHide(): void
}

interface ChildrenOnly {
  children: React.ReactNode
}

export const NotificationsContext = createContext<INotificationsContext>({
  notify: () => {
    return
  },
})

const Toaster = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  align-items: center;
  pointer-events: none;
  padding-bottom: 3rem;
`

interface INotificationContainer {
  opacity: number
  fadeTime: number
}

const NotificationContainer = styled.div<INotificationContainer>`
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  max-width: 500px;
  text-align: center;
  background: ${(props) => props.theme.colours.purple};
  color: white;
  box-shadow: 0 0 9px ${(props) => props.theme.colours.shadow};
  font-weight: bold;
  margin-top: 1rem;
  transition: all ${(props) => props.fadeTime / 1000}s;
  opacity: ${(props) => props.opacity};
  pointer-events: auto;
`

const Notification = ({
  options: { msg, time },
  onHide,
}: NotificationProps) => {
  const [opacity, setOpacity] = useState(0)
  const fadeTime = 500

  useEffect(() => {
    if (!time) return

    // Start fading the notification before we hide it
    const fadeHandle = setTimeout(() => {
      setOpacity(0)
    }, time - fadeTime)

    // Hide the notification after the set time has passed
    const hideHandle = setTimeout(() => {
      onHide()
    }, time)

    return () => {
      clearTimeout(fadeHandle)
      clearTimeout(hideHandle)
    }
  }, [onHide, time])

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <NotificationContainer
      onClick={() => onHide()}
      opacity={opacity}
      fadeTime={fadeTime}
    >
      {msg}
    </NotificationContainer>
  )
}

export const NotificationsProvider = ({
  children,
}: ChildrenOnly): JSX.Element => {
  const [notifications, setNotifications] = useState<Array<JSX.Element | null>>(
    []
  )

  const notificationCreate = (options: NotificationOptions) => {
    setNotifications((old) => {
      const idx = old.length
      const hideCallback = () =>
        setNotifications((prev) => {
          // To hide the notification, we set its index in the notifications list to null
          const prevCopy = [...prev]
          prevCopy[idx] = null
          return prevCopy
        })

      return [
        ...old,
        <Notification options={options} onHide={hideCallback} key={idx} />,
      ]
    })
  }

  return (
    <NotificationsContext.Provider
      value={{
        notify: notificationCreate,
      }}
    >
      {children}
      <Toaster>{notifications}</Toaster>
    </NotificationsContext.Provider>
  )
}
