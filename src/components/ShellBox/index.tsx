import React from 'react';

import './ShellBox.scss';

interface Props {
  children: React.ReactNode;
}

const ShellBox = ({ children }: Props): JSX.Element => {
  return (
    <pre className="shell-box no-highlight">
      <div className="shell-box-top">
      </div>
      <code className="shell-box-code">{children}</code>
    </pre>
  );
};

export default ShellBox;