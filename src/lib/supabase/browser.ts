import { createBrowserClient } from "@supabase/ssr";

import { requireSupabaseConfig } from "@/lib/config/env";

export function createClient() {
  const config = requireSupabaseConfig();

  return createBrowserClient(config.url, config.publishableKey);
}
