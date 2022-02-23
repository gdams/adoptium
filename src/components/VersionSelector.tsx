import React, { useState, useCallback, useEffect } from 'react';
import { ChoiceGroup } from "office-ui-fabric-react";

import { versions, defaultVersion } from '../util/defaults'

const VersionSelector = ({updater, releaseType, Table}) => {
  const [version, udateVersion] = useState({version: defaultVersion});

  const [releases, setReleases] = useState(null);

  useEffect(() => {
    (async () => {
      setReleases(await updater(version.version, releaseType));
    })();
  }, [version.version]);

  const setVersion = useCallback((version) => {
    udateVersion({version: version});
  }, []);

  let dropdownOptions = [];
  for (let version of versions) {
    let option = {
        key: version,
        text: `OpenJDK ${version}`
    }
    dropdownOptions.push(option)
  }
  return (
    <>
      <div className="btn-container">
        <form id="version-selector" className="btn-form">
          <h3>Choose a Version</h3>
          <ChoiceGroup
            className="d-flex justify-content-center"
            defaultSelectedKey={defaultVersion}
            onChange={(e, selectedOption) => { setVersion(selectedOption.key); } }
            options={dropdownOptions} />
        </form>
      </div>
      <Table results={releases}/>
    </>
  );
};

export default VersionSelector;
