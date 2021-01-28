import { createGlobalStyle } from 'styled-components'
import type { DefaultTheme } from 'styled-components'

export const MyBestLifeTheme: DefaultTheme = {
  colours: {
    // Main colours
    purple: '#8813C6',
    blue: '#010686',
    aqua: '#8BE2D8',
    yellow: '#FFCD59',

    // Supporting colours
    purple_light: '#E9C4F5',
    blue_light: '#C0CEFF',
    aqua_light: '#C4F5EF',
    yellow_light: '#FDECC5',

    white: '#ffffff',
  },

  fontSizes: {
    title: '22px',
    heading: '20px',
    highlight: '18px',
    normal: '16px',
    small: '15px',
  },

  screenSizes: {
    phoneOnly: '@media (max-width: 599px)',
    tabletPortraitPlus: '@media (min-width: 600px)',
    tabletLandscapePlus: '@media (min-width: 900px)',
    desktopPlus: '@media (min-width: 1200px),',
  },
}

export const GlobalStyle = createGlobalStyle`

  //
  /* Fonts */
  //

  @font-face {
    font-family: 'Lato';
    src: url('fonts/Lato-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'Catamaran';
    src: url('fonts/Catamaran-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: optional;
  }

  //
  /* Reset adapted from https://github.com/hankchizljaw/modern-css-reset */
  //

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul,
  ol,
  legend {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  fieldset,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Remove list styles on ul, ol elements */
  ul,
  ol {
    list-style: none;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  //
  /* Global defaults */
  //

  body {
    background-color: ${(props) => props.theme.colours.white};
    color: ${(props) => props.theme.colours.blue};
    font-family: Lato, sans-serif;
    font-size: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-style: normal;
    font-weight: normal;
  }

`