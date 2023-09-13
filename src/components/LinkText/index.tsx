import { Link } from 'gatsby-plugin-react-i18next';
import React from 'react';

type LinkTextProps = {
    href: string;
    children?: React.ReactNode;
};

const LinkText = ({ href, children }: LinkTextProps) => {
    return (
        href.startsWith('http') ? <a href={href} target='_blank' rel='noreferrer'>{children}</a> : <Link to={href}>{children}</Link>
    )
}

export default LinkText