import styled, { css } from 'styled-components';

const variants = {
  dark: css`
    color: ${({ theme }) => theme.colors.home.text};
    border: 1px solid rgba(245, 240, 232, 0.4);
    background: rgba(245, 240, 232, 0.06);
  `,
  light: css`
    color: ${({ theme }) => theme.colors.subpage.text};
    border: 1px solid ${({ theme }) => theme.colors.subpage.border};
    background: rgba(212, 207, 199, 0.18);
  `,
};

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.layout.pillRadius};
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  transition: ${({ theme }) => theme.transitions.hover};
  ${({ $variant = 'light' }) => variants[$variant]};
`;

export default Tag;
