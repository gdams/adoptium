import React from 'react';
import moment from 'moment';
import { Trans } from 'gatsby-plugin-react-i18next';
import LinkText from '../LinkText'

const AdoptiumNews = () => {

    const adoptiumNews = {
        title: "Case Study: Building the World's Most Secure OpenJDK Distribution", 
        body: "Find out how the Eclipse Foundation and Adoptium Working Group are pioneering software supply chain security with Eclipse Temurin: <callToActionLink>Download now</callToActionLink>", 
        link: 'https://outreach.eclipse.foundation/adoptium-temurin-supply-chain-security?utm_campaign=Temurin%20Case%20Study&utm_source=website&utm_medium=adoptium%20docs', 
        // NOTE: Dates below are with the format: "YYYY-MM-dd"
        date: new Date('2024-05-01'),
        startDisplayAt: new Date('2024-05-15'),
        stopDisplayAfter: new Date('2024-05-31'),
    }

    const now = Date.now();
    if(!adoptiumNews || now < adoptiumNews.startDisplayAt.getTime() || now > adoptiumNews.stopDisplayAfter.getTime()) return;

    return (
        <div className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
            <div className='container py-5'>
                <h2 className='text-pink'>{adoptiumNews.title}</h2>
                <div>
                    {adoptiumNews.date && <p className='m-0 fw-bold'>{moment(adoptiumNews.date).format('D MMMM YYYY')}</p>}
                    <p className='text-muted lh-sm'>
                        <Trans 
                            defaults={adoptiumNews.body} 
                            components={{
                                callToActionLink: <LinkText href={adoptiumNews.link||''} />
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
    link?: string;
    startDisplayAt: Date;
    stopDisplayAfter: Date;
}
