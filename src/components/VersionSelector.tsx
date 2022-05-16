import React, { useState, useCallback, useEffect } from 'react';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

import DatePicker from 'react-date-picker';

import { versions, defaultVersion } from '../util/defaults'
import { setURLParam } from '../util/setURLParam';

const VersionSelector = ({updater, releaseType, Table}) => {
  let selectedVersion = defaultVersion
  let [versionParam] = useQueryParam('version', NumberParam)
  if (versionParam) {
      selectedVersion = versionParam;
  }
  let [variantParam] = useQueryParam('variant', StringParam)
  if (variantParam) {
      setURLParam('version', variantParam.replace(/\D/g, ''))
      selectedVersion = parseInt(variantParam.replace(/\D/g, ''));
  }

  const [version, udateVersion] = useState(selectedVersion.toString());
  const [numBuilds, udateNumBuilds] = useState(5);
  const [buildDate, updateBuildDate] = useState(new Date());  
  const [releases, setReleases] = useState(null);

  useEffect(() => {
    (async () => {
      setReleases(await updater(version, releaseType, numBuilds, buildDate));
    })();
  }, [version, numBuilds, buildDate]);

  const setVersion = useCallback((version) => {
    setURLParam('version', version);
    udateVersion(version);
  }, []);

  const setNumBuilds= useCallback((number) => {
    udateNumBuilds(number);
  }, []);

  return (
    <>
      <p className='text-center'>
        Use the drop-down boxes below to filter the list of current releases.
      </p>
      <div className="input-group p-3 d-flex justify-content-center">
        <label className="px-2 fw-bold" htmlFor="version">Version</label>
        <select id="version-filter" onChange={(e) => setVersion(e.target.value)} value={version} className="form-select form-select-sm" style={{ maxWidth: '10em' }}>
            {versions.map(
                (version, i): number | JSX.Element => version && (
                    <option key={version} value={version}>{version}</option>
                )
            )}
        </select>
      </div>
      {releaseType === "ea" && (
        <div className="input-group pb-5 d-flex justify-content-center">
          <span className='p-2'>View</span>
          <select id="build-num-filter" onChange={(e) => setNumBuilds(e.target.value)} defaultValue={numBuilds} className="form-select form-select-sm" style={{ maxWidth: '5em' }}>
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
