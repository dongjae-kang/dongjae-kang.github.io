import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MULTI_PROJECT_TAGS = ['Misinformation', 'Platform Governance'];

const variants = {
  dark: css`
    color: ${({ theme }) => theme.colors.home.text};
    border: 1px solid rgba(45, 90, 61, 0.22);
    background: rgba(45, 90, 61, 0.08);
  `,
  light: css`
    color: ${({ theme }) => theme.colors.subpage.text};
    border: 1px solid rgba(45, 90, 61, 0.16);
    background: rgba(45, 90, 61, 0.06);
  `,
};

const TagBase = styled.span`
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
  line-height: 1.4;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.hover};
  ${({ $variant = 'light' }) => variants[$variant]};
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        background: rgba(45, 90, 61, 0.14);
        border-color: rgba(45, 90, 61, 0.32);
      }
    `};
`;

function Tag({ children, $variant, onClick, ...rest }) {
  const navigate = useNavigate();
  const isClickable = MULTI_PROJECT_TAGS.includes(children);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (isClickable) {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/research?tag=${encodeURIComponent(children)}`);
    }
  };

  return (
    <TagBase
      $variant={$variant}
      $clickable={isClickable}
      onClick={handleClick}
      title={isClickable ? `View all ${children} projects` : undefined}
      {...rest}
    >
      {children}
    </TagBase>
  );
}

export default Tag;
