import { Binary, ContributorApiResponse, Contributor, News, TemurinRelease, TemurinReleases } from '../hooks';

export const createRandomContributorApiData = (): ContributorApiResponse => ({
  login: 'login_mock',
  id: 0,
  node_id: 'node_id_mock',
  avatar_url: 'avatar_url_mock',
  gravatar_id: 'gravatar_id_mock',
  url: 'url_mock',
  html_url: 'html_url_mock',
  followers_url: 'followers_url_mock',
  following_url: 'following_url_mock',
  gists_url: 'gists_url_mock',
  starred_url: 'starred_url_mock',
  subscriptions_url: 'subscriptions_url_mock',
  organizations_url: 'organizations_url_mock',
  repos_url: 'repos_url_mock',
  events_url: 'events_url_mock',
  received_events_url: 'received_events_url_mock',
  type: 'type_mock',
  site_admin: false,
  contributions: 3,
});

export const createRandomTemurinRelease = (installer, id): TemurinRelease => ({
  os: 'os_mock',
  arch: 'arch_mock',
  release_link: 'release_link_mock',
  platform_name: `platform_name_mock${id}`,
  release_name: 'release_name_mock',
  release_date: new Date(Date.UTC(2020, 0, 1)),
  binaries: [
    {
      type: 'type_mock',
      link: 'link_mock',
      checksum: 'checksum_mock',
      size: 0,
      extension: 'extension_mock',
      installer_link: installer ? 'installer_link_mock' : undefined,
      installer_checksum: installer ? 'installer_checksum_mock' : undefined,
      installer_size: installer ? 0 : undefined,
      installer_extension: installer ? 'installer_extension_mock' : undefined,
    },
  ],
})

export const createRandomTemurinReleases = (installer, id): TemurinReleases => ({
  release_name: `release_name_mock_${id}`,
  release_link: 'release_link_mock',
  source_url: 'http://source_url_mock',
  timestamp: new Date(Date.UTC(2020, 0, 1)),
  platforms: {
    'platform_mock': {
      assets: [
        {
          os: 'os_mock',
          architecture: 'architecture_mock',
          type: 'type_mock',
          link: 'https://link_mock',
          checksum: `checksum_mock${id}`,
          size: 0,
          extension: 'extension_mock',
          installer_link: installer ? 'https://installer_link_mock' : undefined,
          installer_checksum: installer ? 'installer_checksum_mock' : undefined,
          installer_size: installer ? 0 : undefined,
          installer_extension: installer ? 'installer_extension_mock' : undefined,
        },
      ],
    },
  },
})

export const createRandomContributorViewData = (): Contributor => ({
  avatarUri: 'avatarUri_mock',
  profileUri: 'profileUri_mock',
  login: 'login_mock',
  contributionsCount: 0,
  commitsListUri: 'commitsListUri_mock',
  repo: 'reponame_mock',
});

export const createRandomLatestForOSData = (): Binary => ({
  release_name: 'release_name_mock',
  link: 'link_mock',
});

export const createRandomNewsAndEventsData = (): News => ({
  news: [
    {
      id: 'id_mock',
      title: 'title_mock',
      body: 'body_mock',
      date: new Date(Date.UTC(2020, 0, 1)),
      link: 'link_mock',
    },
  ],
  events: [
    {
      id: 'id_mock',
      title: 'title_mock',
      infoLink: 'infoLink_mock',
      date: new Date(Date.UTC(2020, 0, 1)),
    },
  ]
});

export const createRandomContributorViewData1Contribution = (): Contributor => ({
  avatarUri: 'avatarUri_mock',
  profileUri: 'profileUri_mock',
  login: 'login_mock',
  contributionsCount: 1,
  commitsListUri: 'commitsListUri_mock',
  repo: 'reponame_mock',
});