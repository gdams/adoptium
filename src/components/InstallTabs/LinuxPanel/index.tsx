
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

export const PureLinuxPanel = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query LatestLTS {
      mostRecentLts {
        version
      }
    }
  `)
  const mostRecentLts = data.mostRecentLts.version;
  return (
    <div>
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (Debian or Ubuntu)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">apt-get install </span>temurin-{mostRecentLts}-jdk
      </ShellBox>
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (CentOS/RHEL/Fedora)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">yum install </span>temurin-{mostRecentLts}-jdk
      </ShellBox>
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Install the latest LTS version (openSUSE/SLES)</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">zypper install </span>temurin-{mostRecentLts}-jdk
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