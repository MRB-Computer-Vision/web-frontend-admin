import { shade } from 'polished';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-bottom: 5px;
`;

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
