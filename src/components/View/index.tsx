import React, { ReactNode } from 'react';

import AppBar from '../AppBar';

interface ViewProps {
  children: ReactNode;
  titlePage: string;
}

const View: React.FC<ViewProps> = ({
  children,
  titlePage,
}: ViewProps): JSX.Element => {
  return (
    <div>
      <AppBar titlePage={titlePage} />
      <div>{children}</div>
    </div>
  );
};

export default View;
