import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchNewsItems } from '../fetchNews';
import { mockNewsAPI, mockEventsAPI  } from '../../__fixtures__/hooks';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(AxiosInstance);


afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchNewsItems', () => {
  it('returns valid news and events object', async () => {
    mock.onGet(/.*\/api\/news.*/).reply(200, mockNewsAPI());
    mock.onGet(/.*\/api\/events.*/).reply(200, mockEventsAPI());

    const { result } = renderHook(() => fetchNewsItems(true, 1));
    await waitFor(() => {
      expect(result.current?.news.news[0].title).toBe('news_title_mock')
      expect(result.current?.events[0].title).toBe('events_title_mock')
    }, { interval: 1 });
    // expect(mock.onGet).toHaveBeenCalledTimes(2)
    expect(result.current).toMatchSnapshot()
  })

  it('newsAndEvents to be empty on error', async() => {
    mock.onGet().reply(500);

    const { result } = renderHook(() => fetchNewsItems(true, 1));
    await waitFor(() => {
      expect(result.current?.news.news).toStrictEqual([])
      expect(result.current?.events).toStrictEqual([])
    }, { interval: 1 });
    // expect(axios.get).toHaveBeenCalledTimes(2)
  })
});