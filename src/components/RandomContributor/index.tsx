import React, { MutableRefObject, useRef } from 'react';
import { useAdoptiumContributorsApi, useOnScreen } from '../../hooks';
import './RandomContributor.scss';
import AnimatedPlaceholder from '../AnimatedPlaceholder';
import { Trans } from 'gatsby-plugin-react-i18next';

const RandomContributor = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const contributor = useAdoptiumContributorsApi(isVisible);

  return (
    <div ref={ref} className="random-contributor">
      {!contributor && isVisible && <AnimatedPlaceholder />}
      {contributor && (
        <>
          <div className="random-contributor__avatar">
            <a
              href={contributor.profileUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src={contributor.avatarUri}
                alt="Avatar of an Adoptium contributor"
              />
            </a>
          </div>
          <div className="random-contributor__thank">
            <Trans 
              i18nKey="asciidoc.random.contributor.text" 
              defaults='Thank you <profileUri>{{login}}</profileUri> for making <commitsListUri>{{contributionsCount}} contribution(s)</commitsListUri> to <repoUri>{{repo}}</repoUri>' 
              components={{
                profileUri: <a href={contributor.profileUri} target="_blank" rel="nofollow noopener noreferrer" />, 
                commitsListUri: <a href={contributor.commitsListUri} target="_blank" rel="nofollow noopener noreferrer"/>,
                repoUri: <a href={`https://github.com/adoptium/${contributor.repo}`} target="_blank" rel="nofollow noopener noreferrer"/>,
              }}
              values={{
                'login': contributor.login, 
                'contributionsCount': contributor.contributionsCount,
                'repo': contributor.repo
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RandomContributor;