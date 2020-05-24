import React from 'react';
import Upload from '../../components/Upload';

import { Title } from './styles';

// tipando componente no formato de funcao
const Dashboard: React.FC = () => {
  return (
    <>
      <Title>Exames</Title>
      <Upload />
    </>
  );
};

export default Dashboard;
