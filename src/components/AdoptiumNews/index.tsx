import React from 'react';
import { Trans, useI18next } from 'gatsby-plugin-react-i18next';
import LinkText from '../LinkText'

// NOTES: 
// - You can add a <callToActionLink /> tag to create a link in the body
// - Dates must be with the format: "YYYY-MM-DD"
const predefinedAdoptiumNewsList = [
    {
        title: "Adoptium Summit 2024", 
        body: "Join us Today for the first-ever Adoptium Summit.<br/>An opportunity to connect with other Adoptium community members.<br/><callToActionLink>Register here</callToActionLink>", 
        callToActionLink: 'https://www.eclipse.org/events/2024/adoptium-summit/', 
        date: new Date('2024-09-10'),
        startDisplayAt: new Date('2024-09-10'),
        stopDisplayAfter: new Date('2024-09-11'),
    },
    {
        title: "OCX 24: Join Us at Open Community for Java", 
        body: "Join the Adoptium community at the Eclipse Foundation's flagship developer conference, held 22-24 October in Mainz, Germany. Java.OCXConf.org", 
        date: new Date('2024-09-10'),
        startDisplayAt: new Date('2024-09-15'),
        stopDisplayAfter: new Date('2024-10-24'),
    }
]

const eventDateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: "UTC"
}

interface Props {
    adoptiumNewsList?: AdoptiumNewsItem[];
  }
  
function compareNewsByStartDisplayAt(a: AdoptiumNewsItem, b: AdoptiumNewsItem) {
    return a.startDisplayAt.getTime() - b.startDisplayAt.getTime();
}

const AdoptiumNews = ({ adoptiumNewsList }: Props) => {

    const adoptiumNewsListToDisplay = adoptiumNewsList ? adoptiumNewsList : predefinedAdoptiumNewsList;

    const { language } = useI18next();

    const now = Date.now();

    return (
        adoptiumNewsListToDisplay
            .filter(adoptiumNews => adoptiumNews.startDisplayAt.getTime() <= now && adoptiumNews.stopDisplayAfter.getTime() > now)
            .sort(compareNewsByStartDisplayAt)
            .map((adoptiumNews, index) => {
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

                return (
                    <div key={index} className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
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
                </div>)
            })
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
