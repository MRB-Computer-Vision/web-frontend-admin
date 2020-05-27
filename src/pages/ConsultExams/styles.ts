import { shade } from 'polished';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-bottom: 5px;
`;
export const DataTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  color: #3a3a3a;
  background-color: #fffafa;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  thead {
    font-size: 1.5rem;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #3a3a3a;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f0f0f9;
  }
`;

export const Form = styled.form``;
export const Upload = styled.input``;

export const StyledLink = styled(styled(Link)``)`
  text-decoration: none;
  padding: 10px;
  width: 410px;
  height: 70px;
  background: #3366ff;
  border-radius: 5px 5px 5px 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#3366ff')};
  }
`;
