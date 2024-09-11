import '@mantine/core/styles.css';

import React, { use } from 'react';
import { ColorSchemeScript, MantineColorScheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/constants/config';
import theme from '../theme';

// Metadata configuration
const metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS.join(', '),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ColorSchemeScript />
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
