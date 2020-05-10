import styled, { css } from 'styled-components';

import { shade } from 'polished';

export const Logo = styled.img`
  height: 30px;
  width: 30px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 10px;
`;

export const Form = styled.form`
  margin-top: 10px;
  max-width: 700px;
`;

interface InputProps {
  hasError: boolean;
}

export const Input = styled.input<InputProps>`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  height: 70px;
  padding: 0 24px;
  border: 0;
  border-radius: 5px 5px 5px 5px;
  box-sizing: border-box;
  color: #3a3a3a;
  border: 2px solid #fff;
  ${(props) =>
    props.hasError &&
    css`
      border-color: #ff4d4d;
    `}
  &::placeholder {
    color: #a8a8b3;
  }
`;

export const Button = styled.button`
  width: 210px;
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

export const Error = styled.div`
  display: flex;
  align-items: center;
  background-color: #ff4d4d;
  border-radius: 5px 5px 5px 5px;
  border: 0;
  height: 40px;
  color: #fff;
  font-weight: bold;
  padding: 0 24px;
  margin-bottom: 10px;
`;
