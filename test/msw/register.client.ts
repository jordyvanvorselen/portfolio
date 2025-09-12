import { setupWorker } from "msw/browser"

import { defaultHandlers } from "@/test/msw/defaultHandlers"

export const worker = setupWorker(...defaultHandlers)