import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import Search from "@/pages/Search";
import Article from "@/pages/Article";
import Articles from "@/pages/Articles";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 60, // Cache is kept for 1 hour
      retry: 3, // Retry failed requests 3 times
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: false, // Don't refetch on reconnect
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;