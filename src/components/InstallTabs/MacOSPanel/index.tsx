import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

export const PureMacOSPanel = (): JSX.Element => {
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
        <span className="install__text__no-select"># Install the latest LTS version</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">brew install --cask </span>temurin
      </ShellBox>
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Install a specific version</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">brew tap </span>homebrew/cask-versions
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">brew install --cask </span>temurin@8
       <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">brew install --cask </span>temurin@{mostRecentLts}
      </ShellBox>
      <br />
      <br />
      <br />
      <ShellBox>
        <span className="install__text__no-select"># Uninstall a specific version</span>
        <br />
        <span className="install__text__no-select">$</span>
        <span className="install-text-command">brew uninstall --cask </span>temurin
      </ShellBox>
      <a
        className="install__docs-button"
        href="https://docs.brew.sh/Manpage"
      >
      Read documentation
      </a>
    </div>
  );
};

const MacOSPanel = (): JSX.Element => {
  return <PureMacOSPanel />;
};

export default MacOSPanel;
