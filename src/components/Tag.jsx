import styled, { css } from 'styled-components';

const variants = {
  dark: css`
    color: ${({ theme }) => theme.colors.home.text};
    border: 1px solid rgba(196, 149, 106, 0.25);
    background: rgba(196, 149, 106, 0.08);
  `,
  light: css`
    color: ${({ theme }) => theme.colors.subpage.text};
    border: 1px solid rgba(196, 149, 106, 0.22);
    background: rgba(196, 149, 106, 0.08);
  `,
};

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.layout.pillRadius};
  font-size: 0.78rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: ${({ theme }) => theme.transitions.hover};
  ${({ $variant = 'light' }) => variants[$variant]};
`;

export default Tag;
