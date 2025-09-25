import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { worker } from './mocks/browser.ts'; // Adjust this path to your MSW worker setup
import './db.ts';



// This function will start the mock server and then render the app.
async function prepareAndRender() {
  const queryClient = new QueryClient()
  // Start the MSW service worker and wait for it to be ready.
  // The `await` is the crucial part that solves the race condition.
  await worker.start({
    // Add this line to prevent a warning in the console
    onUnhandledRequest: 'bypass', 
  });

  if (import.meta.env.DEV) {
    import("./mocks/browser").then(({ worker }) => {
      worker.start();
    });
  }
  
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </StrictMode>,
  )
}
prepareAndRender();


