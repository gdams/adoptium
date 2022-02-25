import React, { useState, useCallback, useEffect } from 'react';
import { ChoiceGroup } from "office-ui-fabric-react";
import DatePicker from 'react-date-picker';

import { versions, defaultVersion } from '../util/defaults'

const VersionSelector = ({updater, releaseType, Table}) => {
  const [version, udateVersion] = useState({version: defaultVersion});
  const [numBuilds, udateNumBuilds] = useState({number: 5});
  const [buildDate, updateBuildDate] = useState(new Date());  

  const [releases, setReleases] = useState(null);

  useEffect(() => {
    (async () => {
      setReleases(await updater(version.version, releaseType, numBuilds.number, buildDate));
    })();
  }, [version.version, numBuilds.number, buildDate]);

  const setVersion = useCallback((version) => {
    udateVersion({version: version});
  }, []);

  const setNumBuilds= useCallback((number) => {
    udateNumBuilds({number: number});
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
      {releaseType === "ea" && (
        <div className="input-group p-5 d-flex justify-content-center">
          <span className='p-2'>View</span>
          <select id="build-num-filter" onChange={(e) => setNumBuilds(e.target.value)} defaultValue={numBuilds.number} className="form-select form-select-sm" style={{ maxWidth: '5em' }}>
            <option key={1} value={1}>1</option>
            <option key={5} value={5}>5</option>
            <option key={10} value={10}>10</option>
            <option key={20} value={20}>20</option>
            <option key={50} value={50}>50</option>
          </select>
          <span className='p-2'>nightly builds prior to:</span>
          <DatePicker
            value={buildDate}
            maxDate={new Date()}
            onChange={updateBuildDate}
          />
        </div>
      )}
      <Table results={releases}/>
    </>
  );
};

export default VersionSelector;
