import {
  Binary,
  ContributorApiResponse,
  Contributor,
  MarketplaceRelease,
  News,
  ReleaseAsset,
  TemurinReleases
} from '../hooks';

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

export const createRandomTemurinRelease = (installer, id): ReleaseAsset => ({
  os: 'os_mock',
  architecture: 'arch_mock',
  release_link: new URL('https://release_link_mock'),
  platform_name: `platform_name_mock${id}`,
  release_name: 'release_name_mock',
  release_date: new Date(Date.UTC(2020, 0, 1)),
  binaries: [
    {
      type: 'type_mock',
      link: new URL('https://link_mock'),
      checksum: 'checksum_mock',
      size: 0,
      extension: 'extension_mock',
      installer_link: installer ? new URL('https://installer_link_mock') : undefined,
      installer_checksum: installer ? 'installer_checksum_mock' : undefined,
      installer_size: installer ? 0 : undefined,
      installer_extension: installer ? 'installer_extension_mock' : undefined,
    },
  ],
})

export const createRandomMarketplaceRelease = (installer): MarketplaceRelease => ({
  release_name: 'release_name_mock',
  vendor: 'vendor_mock',
  binary: {
    os: 'os_mock',
    architecture: 'arch_mock',
    distribution: 'distribution_mock',
    image_type: 'type_mock',
    jvm_impl: 'jvm_impl_mock',
    timestamp: new Date(Date.UTC(2020, 0, 1)),
    scm_ref: 'scm_ref_mock',
    openjdk_scm_ref: 'openjdk_scm_ref_mock',
    aqavit_results_link: new URL('https://aqavit_results_link_mock'),
    tck_affidavit_link: new URL('https://tck_affidavit_link_mock'),
    package: {
      name: 'name_mock.tar.gz',
      link: new URL('https://link_mock'),
      sha265sum: 'sha265sum_mock',
      sha256sum_link: new URL('https://sha256sum_link_mock'),
      signature_link: new URL('https://signature_link_mock'),
    },
    installer: installer
      ? [
          {
            name: 'installer_name_mock.msi',
            link: new URL('https://installer_link_mock'),
            sha265sum: 'installer_sha265sum_mock',
            sha256sum_link: new URL('https://installer_sha256sum_link_mock'),
            signature_link: new URL('https://installer_signature_link_mock'),
          },
        ]
      : undefined,
  },
  version: {
    major: 0,
    minor: 0,
    security: 0,
    patch: 0,
    build: 0,
    openjdk_version: 'openjdk_version_mock',
  }
})

export const createRandomTemurinReleases = (installer, id): TemurinReleases => ({
  release_name: `release_name_mock_${id}`,
  release_link: new URL('https://release_link_mock'),
  source_url: new URL('https://source_url_mock'),
  timestamp: new Date(Date.UTC(2020, 0, 1)),
  platforms: {
    'platform_mock': {
      assets: [
        {
          os: 'os_mock',
          architecture: 'architecture_mock',
          type: 'type_mock',
          link: new URL('https://link_mock'),
          checksum: `checksum_mock${id}`,
          size: 0,
          extension: 'extension_mock',
          installer_link: installer ? new URL('https://installer_link_mock') : undefined,
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
  link: new URL('https://link_mock'),
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