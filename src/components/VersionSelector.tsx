import React, { useState, useCallback, useEffect } from 'react';
import { Trans, useI18next } from 'gatsby-plugin-react-i18next'
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import DatePicker from 'react-date-picker';

import { versions, defaultVersion } from '../util/defaults'
import { setURLParam } from '../util/setURLParam';

const VersionSelector = ({updater, releaseType, Table}) => {
  const { language } = useI18next();
  let selectedVersion = defaultVersion
  const versionParam = queryString.parse(useLocation().search).version;
  if (versionParam) {
      selectedVersion = Number(versionParam);
  }
  const variantParam = queryString.parse(useLocation().search).variant;
  if (variantParam) {
      // convert openjdk11 to 11
      const parsedVersion = variantParam.toString().replace(/\D/g, '')
      setURLParam('version', parsedVersion)
      selectedVersion = parseInt(parsedVersion);
  }

  const [version, udateVersion] = useState(selectedVersion.toString());
  const [numBuilds, udateNumBuilds] = useState(5);
  const [page, updatePage] = useState(0);
  const [buildDate, updateBuildDate] = useState(new Date());  
  const [releases, setReleases] = useState(null);

  useEffect(() => {
    (async () => {
      setReleases(await updater(version, releaseType, numBuilds, buildDate, page));
    })();
  }, [version, numBuilds, buildDate, page]);

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
        <Trans>Use the drop-down boxes below to filter the list of releases.</Trans>
      </p>
      <div className="input-group p-3 d-flex justify-content-center">
        <label className="px-2 fw-bold" htmlFor="version"><Trans>Version</Trans></label>
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
            locale={language}
          />
        </div>
      )}
      <Table results={releases} updatePage={updatePage}/>
    </>
  );
};

export default VersionSelector;
