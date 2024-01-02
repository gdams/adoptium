import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchNewsItems } from '../fetchNews';
import { mockNewsAPI, mockEventsAPI  } from '../../__fixtures__/hooks';
import AxiosInstance from 'axios'
import axios from 'axios';


afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchNewsItems', () => {
  it('returns valid news and events object', async () => {
    AxiosInstance.get.mockImplementation((url: String) => {
      if(url.indexOf('/api/news') > 0) {
        return Promise.resolve({data: mockNewsAPI()});
      } else if (url.indexOf('/api/events') > 0) {
        return Promise.resolve({data: mockEventsAPI()});
      }
    });

    const { result } = renderHook(() => fetchNewsItems(true, 1));
    await waitFor(() => {
      expect(result.current?.news.news[0].title).toBe('news_title_mock')
      expect(result.current?.events[0].title).toBe('events_title_mock')
    }, { interval: 1 });

    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(result.current).toMatchSnapshot()
  })

  it('newsAndEvents to be empty on error', async() => {
    AxiosInstance.get.mockImplementation((url: String) => {
      return Promise.reject('error')
    });

    const { result } = renderHook(() => fetchNewsItems(true, 1));
    await waitFor(() => {
      expect(result.current?.news.news).toStrictEqual([])
      expect(result.current?.events).toStrictEqual([])
    }, { interval: 1 });
    expect(axios.get).toHaveBeenCalledTimes(2)
  })
});