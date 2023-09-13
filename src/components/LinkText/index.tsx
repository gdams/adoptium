import { Link } from 'gatsby-plugin-react-i18next';
import React from 'react';

type LinkTextProps = {
    href: string;
    children?: React.ReactNode;
    target?: string,
    rel?: string
};

const LinkText = ({ href, children, target, rel }: LinkTextProps) => {
    return (
        href.startsWith('http') ? <a href={href} target={target ? target : '_blank'} rel={rel ? rel : 'noreferrer'}>{children}</a> : <Link to={href}>{children}</Link>
    )
}

export default LinkText