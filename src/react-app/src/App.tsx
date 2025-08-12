
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Navigation } from "./components/Navigation";
import { DataProvider } from "./contexts/DataContext";
import Board from "./pages/Board";
import Calendar from "./pages/FullCalendar";
import 'react-tooltip/dist/react-tooltip.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <DataProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Toaster />
              <Sonner />
              <HashRouter>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Board />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Routes>
              </HashRouter>
            </div>
          </DataProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
