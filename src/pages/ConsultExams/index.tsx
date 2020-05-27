import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Title, DataTable, StyledLink } from './styles';

import Message from '../../components/Message';

interface Exam {
  id: string;
  status: string;
  type: string;
}

// tipando componente no formato de funcao
const ConsultExams: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [erro, setErro] = useState(false);
  const [message, setMessage] = useState('');
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleData(): Promise<void> {
    setLoading(true);
    setShowMessage(false);
    try {
      const url = `${process.env.REACT_APP_BASE_URL || ''}/exams`;
      const response = await axios.get(url);
      setExams(response.data.data);
    } catch (err) {
      setMessage('Falha na consulta de exames');
      setErro(true);
      setShowMessage(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Title>Consult Exams</Title>
      <StyledLink to="/">Home</StyledLink>
      &nbsp;
      <StyledLink to="/submit">Submit Exam</StyledLink>
      <Message show={showMessage} erro={erro} message={message} />
      <DataTable>
        <thead>
          <tr>
            <th>Code</th>
            <th>Archive</th>
            <th>Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.type}</td>
              <td>{exam.status}</td>
            </tr>
          ))}

          {loading && (
            <tr>
              <td colSpan={3}>carregando...</td>
            </tr>
          )}

          {!loading && exams.length === 0 && (
            <tr>
              <td colSpan={3}>Não há exames</td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </>
  );
};

export default ConsultExams;
