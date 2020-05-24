import React from 'react';

import { Container } from './styles';

interface MessageProps {
  show: boolean;
  erro: boolean;
  message: string;
}

// tipando componente no formato de funcao
const Message: React.FC<MessageProps> = ({
  show,
  erro,
  message,
}: MessageProps) => {
  return (
    <Container show={show} error={erro}>
      {message}
    </Container>
  );
};

export default Message;
