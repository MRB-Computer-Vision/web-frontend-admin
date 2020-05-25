import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
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
