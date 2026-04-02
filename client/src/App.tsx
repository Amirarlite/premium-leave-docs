import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LeaveRequestForm from "./components/LeaveRequestForm";
import LeaveApprovalLetter from "./components/LeaveApprovalLetter";
import LeaveStatusTracker from "./components/LeaveStatusTracker";
import LeaveCancellationForm from "./components/LeaveCancellationForm";
import LeaveExtensionRequest from "./components/LeaveExtensionRequest";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/leave-request"} component={LeaveRequestForm} />
      <Route path={"/leave-approval"} component={LeaveApprovalLetter} />
      <Route path={"/leave-tracker"} component={LeaveStatusTracker} />
      <Route path={"/leave-cancellation"} component={LeaveCancellationForm} />
      <Route path={"/leave-extension"} component={LeaveExtensionRequest} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
