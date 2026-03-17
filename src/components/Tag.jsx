import styled, { css } from 'styled-components';

const variants = {
  dark: css`
    color: ${({ theme }) => theme.colors.home.text};
    border: 1px solid rgba(154, 199, 175, 0.42);
    background: linear-gradient(180deg, rgba(154, 199, 175, 0.16), rgba(8, 23, 17, 0.22));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  `,
  light: css`
    color: ${({ theme }) => theme.colors.subpage.accent};
    border: 1px solid rgba(30, 91, 67, 0.22);
    background: linear-gradient(180deg, rgba(154, 199, 175, 0.18), rgba(255, 255, 255, 0.5));
  `,
};

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.layout.pillRadius};
  font-size: 0.82rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: ${({ theme }) => theme.transitions.hover};
  ${({ $variant = 'light' }) => variants[$variant]};
`;

export default Tag;
