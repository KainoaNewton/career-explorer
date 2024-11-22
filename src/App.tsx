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
      staleTime: 0, // Data is considered stale immediately
      refetchOnWindowFocus: true, // Refetch when window gains focus
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: true, // Refetch when reconnecting
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