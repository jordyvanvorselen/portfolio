import { setupServer } from "msw/node"

import { defaultHandlers } from "@/test/msw/defaultHandlers"

export const server = setupServer(...defaultHandlers)