import React, { MutableRefObject, useRef, useState, useCallback, useEffect } from 'react';
import { ChoiceGroup } from "office-ui-fabric-react";

import { versions, defaultVersion } from '../util/defaults'
import TemurinArchiveTable from './TemurinArchiveTable'
import { getAssetsForVersion } from '../hooks';

const VersionSelector = () => {
  const [version, udateVersion] = useState({version: defaultVersion});
  const ref = useRef<HTMLDivElement | null>(null);

  const [releases, setReleases] = useState(null);

  useEffect(() => {
    (async () => {
      setReleases(await getAssetsForVersion(version.version));
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
      <div ref={ref} className="btn-container">
        <form id="version-selector" className="btn-form">
          <h3>Choose a Version</h3>
          <ChoiceGroup
            className="d-flex justify-content-center"
            defaultSelectedKey={defaultVersion}
            onChange={(e, selectedOption) => { setVersion(selectedOption.key); } }
            options={dropdownOptions} />
        </form>
      </div>
      <TemurinArchiveTable results={releases}/>
    </>
  );
};

export default VersionSelector;
