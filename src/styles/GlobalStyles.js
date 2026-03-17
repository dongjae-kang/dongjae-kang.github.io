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
    background: ${({ theme }) => theme.colors.subpage.background};
    color: ${({ theme }) => theme.colors.subpage.text};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${({ theme }) => theme.transitions.hover};
  }

  a:hover {
    opacity: 0.7;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
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
    background: rgba(139, 168, 136, 0.22);
  }
`;
