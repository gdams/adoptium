import React from 'react';
import { Trans, useI18next } from 'gatsby-plugin-react-i18next';
import LinkText from '../LinkText'

// NOTES: 
// - You can add a <callToActionLink /> tag to create a link in the body
// - Dates must be with the format: "YYYY-MM-dd"
const adoptiumNews = {
    title: "Adoptium Summit 2024", 
    body: "Be a part of the first-ever Adoptium Summit on September, 10.<br/>Connect with peers to exchange knowledge on Temurin, AQAvit and other Adoptium's projects.<br/><callToActionLink>Register here</callToActionLink>", 
    callToActionLink: 'https://www.eclipse.org/events/2024/adoptium-summit/', 
    date: new Date('2024-09-10'),
    startDisplayAt: new Date('2024-08-01'),
    stopDisplayAfter: new Date('2024-09-09'),
}

const eventDateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: "UTC"
}

const AdoptiumNews = () => {

    const { language } = useI18next();

    var eventDateUTC:Date|null = null;
    if(adoptiumNews.date) {
        eventDateUTC = new Date(Date.UTC(
            adoptiumNews.date.getUTCFullYear(), 
            adoptiumNews.date.getUTCMonth(),
            adoptiumNews.date.getUTCDate(), 
            adoptiumNews.date.getUTCHours(),
            adoptiumNews.date.getUTCMinutes(), 
            adoptiumNews.date.getUTCSeconds()));
    
    }

    const now = Date.now();
    if(!adoptiumNews || now < adoptiumNews.startDisplayAt.getTime() || now > adoptiumNews.stopDisplayAfter.getTime()) return;

    return (
        <div className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
            <div className='container py-5'>
                <h2 className='text-pink'>{adoptiumNews.title}</h2>
                <div>
                    {eventDateUTC && <p className='m-0 fw-bold'>{(eventDateUTC.toLocaleDateString(language, eventDateOptions))}</p>}
                    <p className='text-muted lh-sm'>
                        <Trans 
                            defaults={adoptiumNews.body} 
                            components={{
                                callToActionLink: <LinkText href={adoptiumNews.callToActionLink||''} />
                            }}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdoptiumNews;

export interface AdoptiumNewsItem {
    title: string;
    body: string;
    date?: Date;
    callToActionLink?: string;
    startDisplayAt: Date;
    stopDisplayAfter: Date;
}
