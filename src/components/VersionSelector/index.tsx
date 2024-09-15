import React, { useState, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Trans, useI18next } from 'gatsby-plugin-react-i18next'
import { useLocation } from '@gatsbyjs/reach-router';
import queryString from 'query-string';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import * as Locales from 'date-fns/locale';

import { setURLParam } from '../../util/setURLParam';

const VersionSelector = ({updater, releaseType, Table}) => {
  const data = useStaticQuery(graphql`
    query VersionsQuery {
      allVersions(sort: {version: DESC}) {
        edges {
          node {
            version
            label
            lts
          }
        }
      }
      mostRecentLts {
        version
      }
      mostRecentFeatureVersion {
        version
      }
    }
  `)

  const defaultVersion = data.mostRecentLts.version;
  const mostRecentFeatureVersion = data.mostRecentFeatureVersion.version;
  const versions = data.allVersions.edges;

  const { language } = useI18next();

  let locale;

  // import the correct date locale for the language
  if (language !== 'en') {
    locale = Locales[language] ?? Locales[language.substring(0, 2)] ?? Locales.enUS
  }

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
  const [buildDate, updateBuildDate] = useState<Date>(new Date());
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

  const versionsToDisplay = [...versions]

  if(releaseType === "ea") {
    // if releaseType is "ea", add missing "ea" versions up to mostRecentFeatureVersion
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    // https://github.com/adoptium/adoptium.net/issues/3016
    // johnoliver: "assume that there are EA versions for versions between 16 and most_recent_feature_version"
    const sixteenToLastEA = range(16, mostRecentFeatureVersion, 1);

    sixteenToLastEA.forEach(version => {
      if(versionsToDisplay.findIndex(v => v.node.version === version) < 0) {
        // this version number is missing, append to the version list
        const v = {
          node: {
            id: version,
            version: version,
            label: `${version} - EA`
          }
        }
        versionsToDisplay.push(v)
      }
    })

    // sort by version DESC
    versionsToDisplay.sort((v1, v2) => v2.node.version - v1.node.version)
  }

  return (
    <>
      <p className='text-center'>
        <Trans>Use the drop-down boxes below to filter the list of releases.</Trans>
      </p>
      <div className="input-group p-3 d-flex justify-content-center">
        <label className="px-2 fw-bold" htmlFor="version"><Trans>Version</Trans></label>
        <select data-testid="version-filter" aria-label="version-filter" id="version-filter" onChange={(e) => setVersion(e.target.value)} value={version} className="form-select form-select-sm" style={{ maxWidth: '10em' }}>
            {versionsToDisplay.map(
              (version, i): number | JSX.Element => version && (
                <option key={version.node.id} value={version.node.version}>{version.node.label}</option>
              )
            )}
        </select>
      </div>
      {releaseType === "ea" && (
        <div className="input-group pb-5 d-flex justify-content-center" style={{lineHeight: '36px'}}>
          <span className='p-2'><Trans i18nKey='vendor.selector.view' defaults='View'/></span>
          <select data-testid="build-num-filter" aria-label="Filter by number of builds" id="build-num-filter" onChange={(e) => setNumBuilds(e.target.value)} defaultValue={numBuilds} className="form-select form-select-sm" style={{ maxWidth: '5em' }}>
            <option key={1} value={1}>1</option>
            <option key={5} value={5}>5</option>
            <option key={10} value={10}>10</option>
            <option key={20} value={20}>20</option>
            <option key={50} value={50}>50</option>
          </select>
          <span className='p-2'><Trans i18nKey='vendor.selector.prior.to' defaults='nightly builds prior to:'/></span>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
            <DesktopDatePicker
              label="Build Date"
              value={buildDate}
              maxDate={new Date()}
              onChange={(newValue) => {
                newValue && updateBuildDate(newValue);
              }}
              sx={{
                maxWidth: '10em',
              }}
            />
          </LocalizationProvider>
        </div>
      )}
      <Table results={releases} updatePage={updatePage}/>
    </>
  );
};

export default VersionSelector;
