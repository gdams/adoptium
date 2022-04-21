import React, { MutableRefObject, useRef } from 'react';
import { useAdoptiumContributorsApi, useOnScreen } from '../../hooks';
import './RandomContributor.scss';
import AnimatedPlaceholder from '../AnimatedPlaceholder';

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
            Thank you{' '}
            <a
              href={contributor.profileUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {contributor.login}
            </a>{' '}
            for making{' '}
            <a
              href={contributor.commitsListUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{contributor.contributionsCount}
                {contributor.contributionsCount === 1 ? ' contribution' : ' contributions'}
              </span>
            </a>{' '}
            to{' '}
            <a
              href={`https://github.com/adoptium/${contributor.repo}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{contributor.repo}</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomContributor;