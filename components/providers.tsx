'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children, nonce }: { children: ReactNode; nonce?: string }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false} nonce={nonce}>
      {children}
    </ThemeProvider>
  );
}
