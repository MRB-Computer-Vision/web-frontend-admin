import React from 'react';
import Upload from '../../components/Upload';

import { Title, StyledLink } from './styles';

// tipando componente no formato de funcao
const SubmitExams: React.FC = () => {
  return (
    <>
      <Title>Submit Exam</Title>
      <StyledLink to="/">Home</StyledLink>
      &nbsp;
      <StyledLink to="/consult">Consult Exams</StyledLink>
      <Upload />
    </>
  );
};

export default SubmitExams;
