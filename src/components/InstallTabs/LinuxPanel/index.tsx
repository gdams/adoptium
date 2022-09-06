import { Link } from 'gatsby-plugin-react-i18next';
import React from 'react';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

export const PureLinuxPanel = (): JSX.Element => {
  return (
    <div>
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (Debian or Ubuntu)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">apt-get install </span>temurin-17-jdk
      </ShellBox>
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (CentOS/RHEL/Fedora)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">yum install </span>temurin-17-jdk
      </ShellBox>
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (openSUSE/SLES)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">zypper install </span>temurin-17-jdk
      </ShellBox>
      <Link
        className="install__docs-button"
        to="/installation/linux"
      >
      Read documentation
      </Link>
    </div>
  );
};

const LinuxPanel = (): JSX.Element => {
  return <PureLinuxPanel />;
};

export default LinuxPanel;