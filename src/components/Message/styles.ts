import styled, { css } from 'styled-components';

interface Props {
  error: boolean;
  show: boolean;
}

export const Container = styled.div<Props>`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  color: #004085;
  border-color: #b8daff;
  background-color: #cce5ff;
  display: none;
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}
  ${(props) =>
    props.error &&
    css`
      color: #721c24;
      border-color: #721c24;
      background-color: #f8d7da;
    `}
`;
