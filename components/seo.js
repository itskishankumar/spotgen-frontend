import React from 'react';
import Head from 'next/head';

export const SEO_CONTENT = {
  description: 'Website by Kishan Kumar',
  twitterCreator: '@',
  siteUrl: 'https://spotgen-frontend.vercel.app/',
};

const SEO = ({ children, description, route, title }) => {
  const pageUrl = `${SEO_CONTENT.siteUrl}${route ?? '/'}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name={'lang'} content={'en'} />
      <meta name={'description'} content={description ?? SEO_CONTENT.description} />
      <meta property={'og:url'} content={pageUrl} />
      <meta property={'og:type'} content={'website'} />
      <meta property={'og:title'} content={title} />
      {children}
    </Head>
  );
};

export default SEO;
