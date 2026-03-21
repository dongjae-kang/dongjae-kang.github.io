import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: ${({ theme }) => theme.lineHeights.body};
    background: ${({ theme }) => theme.colors.light.background};
    color: ${({ theme }) => theme.colors.light.text};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${({ theme }) => theme.transitions.hover};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  p,
  li,
  span,
  a,
  button,
  input,
  textarea,
  select,
  label {
    font-size: max(0.78rem, 1em);
  }

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: rgba(154, 184, 158, 0.32);
  }
`;
