import { useEffect, useState } from 'react';

const baseUrl = 'https://newsroom.eclipse.org/api';

export function fetchNewsItems(
    isVisible: boolean,
): News | null {
    const [news, setNews] = useState<NewsItem[] | null>([]);
    const [events, setEvents] = useState<EventItem[] | null>([]);
    useEffect(() => {
        if (isVisible) {
        (async () => {
            setNews(await fetchLatestNews());
            setEvents(await fetchLatestEvents());
        })();
        }
    }, [isVisible]);

    const newsAndEvents: News = {
        news: news,
        events: events
    }

    return newsAndEvents;
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
    news: NewsItem[] | null;
    events: EventItem[] | null;
}

export interface NewsItem {
    id: string;
    title: string;
    body: string;
    date: Date;
    link: string;
}

export interface EventItem {
    id: string;
    title: string;
    infoLink: string;
    date: Date;
}
