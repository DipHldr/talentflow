// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.ts";

// This worker runs in the browser and intercepts fetch/XHR calls
export const worker = setupWorker(...handlers);
