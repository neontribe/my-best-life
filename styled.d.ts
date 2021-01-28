import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colours: {
      purple: string
      blue: string
      aqua: string
      yellow: string
      purple_light: string
      blue_light: string
      aqua_light: string
      yellow_light: string
      white: string
    }

    fontSizes: {
      title: string
      heading: string
      highlight: string
      normal: string
      small: string
    }

    screenSizes: {
      phoneOnly: string
      tabletPortraitPlus: string
      tabletLandscapePlus: string
      desktopPlus: string
    }
  }
}
