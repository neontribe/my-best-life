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
      blue_highlight: string
      white: string
      grey: string
      grey_dark: string
      shadow: string
    }

    fontSizes: {
      title: string
      heading: string
      highlight: string
      normal: string
      small: string
      extraSmall: string
    }

    screenSizes: {
      smallPhoneOnly: string
      phonePlus: string
      tabletPortraitPlus: string
      tabletLandscapePlus: string
      desktopPlus: string
    }

    gutters: {
      small: string
      large: string
    }

    headerHeight: string
  }
}
