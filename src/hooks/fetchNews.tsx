import { useEffect, useState } from 'react';

const baseUrl = 'https://newsroom.eclipse.org/api';

export function fetchNewsItems(
    isVisible: boolean,
): News | null {
    const [news, setNews] = useState<News | null>(null);
    const [events, setEvents] = useState<News | null>(null);
    useEffect(() => {
        if (isVisible) {
        (async () => {
            setNews(await fetchLatestNews());
            setEvents(await fetchLatestEvents());
        })();
        }
    }, [isVisible]);

    return [news, events];
}

async function fetchLatestNews() {
    const url = `${baseUrl}/news?parameters[publish_to]=adoptium`;
    const response = await fetch(url);
    const json = (await response.json());
    return json.news
}

async function fetchLatestEvents() {
    const url = `${baseUrl}/events?parameters[publish_to]=adoptium`;
    const response = await fetch(url);
    const json = (await response.json());
    return json.events
}

export interface News {
    news: NewsItem;
    events: Events;
}

export interface NewsItem {
    id: string;
}

export interface Events {
    id: string;
}