import styled, { css } from 'styled-components';

const variants = {
  dark: css`
    color: ${({ theme }) => theme.colors.home.text};
    border: 1px solid rgba(154, 184, 158, 0.36);
    background: linear-gradient(180deg, rgba(154, 184, 158, 0.14), rgba(13, 26, 20, 0.2));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  `,
  light: css`
    color: ${({ theme }) => theme.colors.subpage.text};
    border: 1px solid rgba(196, 149, 106, 0.22);
    background: linear-gradient(180deg, rgba(196, 149, 106, 0.08), rgba(255, 255, 255, 0.62));
  `,
};

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.layout.pillRadius};
  font-size: 0.82rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 400;
  letter-spacing: 0.01em;
  transition: ${({ theme }) => theme.transitions.hover};
  ${({ $variant = 'light' }) => variants[$variant]};
`;

export default Tag;
