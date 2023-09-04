import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchReleaseNotesForVersion } from '../fetchReleaseNotes';
import { createMockReleaseNotesAPI } from '../../__fixtures__/hooks';

let mockResponse = createMockReleaseNotesAPI(1);

// @ts-ignore
global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse)
}));

afterEach(() => {
  vi.clearAllMocks();
});

let sortReleaseNotesByCallback = vi.fn();

describe('fetchReleaseNotesForVersion', () => {
  it('returns valid JSON', async () => {
    const { result } = renderHook(() => fetchReleaseNotesForVersion(true, 'sample_version', sortReleaseNotesByCallback));
    await waitFor(() => {
      expect(result.current?.release_name).toBe('release_name_mock')
    }, { interval: 1 });
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.adoptium.net/v3/info/release_notes/sample_version"
    );
    expect(result.current).toMatchSnapshot()
  });

  it('returns null if error is caught in fetch', async () => {
    global.fetch = vi.fn(() => Promise.reject('error'));
    const { result } = renderHook(() => fetchReleaseNotesForVersion(true, 'sample_version', sortReleaseNotesByCallback));
    await waitFor(() => {
      expect(result.current).toBe(null)
    }, { interval: 1 });
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.adoptium.net/v3/info/release_notes/sample_version"
    );
  });

  it('returns null if version is not defined', async () => {
    const { result } = renderHook(() => fetchReleaseNotesForVersion(true, null, sortReleaseNotesByCallback));
    expect(result.current).toBe(null)
  });

  it('checks sortReleaseNotesByCallback to be called', async () => {
    const { result } = renderHook(() => fetchReleaseNotesForVersion(true, 'sample_version', sortReleaseNotesByCallback));
    await waitFor(() => {
      expect(sortReleaseNotesByCallback).toHaveBeenCalledTimes(1)
    }, { interval: 1 });
  });

  it('checks sortReleaseNotesByCallback NOT to be called', async () => {
    const { result } = renderHook(() => fetchReleaseNotesForVersion(true, 'sample_version'));
    await waitFor(() => {
      expect(sortReleaseNotesByCallback).toHaveBeenCalledTimes(0);
    }, { interval: 1 });
  });
});