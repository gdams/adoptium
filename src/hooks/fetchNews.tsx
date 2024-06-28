import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://newsroom.eclipse.org/api';

export function fetchNewsItems(
    isVisible: boolean,
    page: number,
): News | null {

    const [news, setNews] = useState<NewsResponse>({news: [], pagination: null});
    const [events, setEvents] = useState<EventItem[]>([]);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            setNews(await fetchLatestNews(page));
            setEvents(await fetchLatestEvents());
        })();
        }
    }, [isVisible, page]);

    const newsAndEvents: News = {
        news: news,
        events: events
    }

    return newsAndEvents;
}

async function fetchLatestNews(page) {
    const url = new URL(`${baseUrl}/news`);
    url.searchParams.append('parameters[publish_to]', 'adoptium');
    url.searchParams.append('page', page);
    url.searchParams.append('pagesize', '5');

    return axios.get(url.toString())
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return []
        });
}

async function fetchLatestEvents() {
    const url = new URL(`${baseUrl}/events`);
    url.searchParams.append('parameters[publish_to]', 'adoptium');

    return axios.get(url.toString())
        .then(function (response) {
            return response.data.events;
        })
        .catch(function (error) {
            return []
        });
}

export interface News {
    news: NewsResponse;
    events: EventItem[];
}

export interface NewsResponse {
    news: NewsItem[];
    pager: {
        current_page: number;
        items_per_page: number;
        total_items: number;
        total_pages: number;
    } | null;
}

export interface NewsItem {
    id: string;
    title: string;
    body: string;
    date: Date;
    link: URL;
}

export interface EventItem {
    id: string;
    title: string;
    infoLink: URL;
    date: Date;
}

export interface EventAPI {
    events: EventItem[];
}
