// Style system: Forge rouge / terminal éditorial — charbon, rouge LUST, ivoire, rail latéral et micro-interactions brèves.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import Analytics from "./components/Analytics";
import GlobalParticles from "./components/GlobalParticles";
import SiteLoader from "./components/SiteLoader";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import LegalPage from "./pages/LegalPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cgu" component={() => <LegalPage kind="terms" />} />
      <Route path="/confidentialite" component={() => <LegalPage kind="privacy" />} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark" switchable>
          <div className="app-root">
            <GlobalParticles />
            <div className="app-content">
              <TooltipProvider>
                <Toaster />
                <SiteLoader />
                <Router />
                <CookieConsent />
                <Analytics />
              </TooltipProvider>
            </div>
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
