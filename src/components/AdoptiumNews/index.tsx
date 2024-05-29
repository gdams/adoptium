import React from 'react';
import moment from 'moment';
import { Trans } from 'gatsby-plugin-react-i18next';
import LinkText from '../LinkText'

const AdoptiumNews = () => {

    const adoptiumNews: AdoptiumNewsItem[] = [
        { id: 1, key: "case.study", title: "Case Study: Building the World's Most Secure OpenJDK Distribution", body: "Find out how the Eclipse Foundation and Adoptium Working Group are pioneering software supply chain security with Eclipse Temurin: <optionalHref>Download now</optionalHref>", link: 'https://outreach.eclipse.foundation/adoptium-temurin-supply-chain-security?utm_campaign=Temurin%20Case%20Study&utm_source=website&utm_medium=adoptium%20docs', date: new Date(2024, 4, 1) },
        { id: 2, key: "adoption.summit.cfp", title: "Adoptum Summit - CFP", body: "Share your insights and innovations at the Adoptium Summit 2024.<br/>Submit your paper before May 30.<br/><optionalHref>Register here</optionalHref>", link: 'https://www.papercall.io/adoptium-summit', date: new Date(2024, 4, 29) },
        { id: 3, key: "adoption.summit.registration", title: "Adoptum Summit - Registration", body: "Be a part of the first-ever Adoptium Summit on September, 10.<br/>Connect with peers to exchange knowledge on Temurin, AQAvit and other Adoptium's projects.<br/><optionalHref>Register here</optionalHref>", link: 'https://www.eclipse.org/events/2024/adoptium-summit/', date: new Date(2024, 4, 28) }
    ]

    return (
        <div className='container py-5'>
            <h2>Adoptium News</h2>
            {adoptiumNews.map(
                (item, i) =>
                    item && (
                        <div key={item.id}>
                            <p className='h5'>{item.title}</p>
                            <p className='m-0 fw-bold'>{moment(item.date).format('D MMMM YYYY')}</p>
                            <p className='text-muted lh-sm'>
                                <Trans 
                                    key={item.key} 
                                    defaults={item.body} 
                                    components={{
                                        optionalHref: <LinkText href={item.link||''} />
                                    }}
                                />
                            </p>
                        </div>
                    )
            )}
        </div>
    );
};

export default AdoptiumNews;

export interface AdoptiumNewsItem {
    id: number;
    key: string;
    title: string;
    body: string;
    date: Date;
    link?: string
}
