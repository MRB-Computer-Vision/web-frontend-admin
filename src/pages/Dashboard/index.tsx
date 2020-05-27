import React from 'react';

import { Title, StyledLink } from './styles';

// tipando componente no formato de funcao
const Dashboard: React.FC = () => {
  return (
    <>
      <Title>MVP</Title>
      <StyledLink to="/consult">Consult Exams</StyledLink>
      &nbsp;
      <StyledLink to="/submit">Submit Exam</StyledLink>
    </>
  );
};

export default Dashboard;
