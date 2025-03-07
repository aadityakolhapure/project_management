'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Footer } from '@/components/footer';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        // themes={{
        //   light: 'theme-light',
        // }}
        defaultTheme="light" // ✅ Set light as the default theme
      >
        <div className="h-16">
          <Header />
        </div>
        {children}
        {/* <div>
          <Footer/>
        </div> */}
      </ThemeProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
