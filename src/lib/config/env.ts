import { z } from "zod";

const supabaseEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
});

type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;

export type SupabaseConfigStatus =
  | {
      configured: true;
      url: string;
      anonKey: string;
      host: string;
    }
  | {
      configured: false;
      missing: Array<keyof SupabaseEnv>;
      message: string;
    };

type EnvMap = Record<string, string | undefined>;

export function getSupabaseConfig(env: EnvMap = process.env): SupabaseConfigStatus {
  const parsed = supabaseEnvSchema.safeParse(env);

  if (parsed.success) {
    return {
      configured: true,
      url: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      host: new URL(parsed.data.NEXT_PUBLIC_SUPABASE_URL).host,
    };
  }

  const missing = new Set<keyof SupabaseEnv>();

  for (const key of Object.keys(supabaseEnvSchema.shape) as Array<keyof SupabaseEnv>) {
    if (!env[key]) {
      missing.add(key);
    }
  }

  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (key === "NEXT_PUBLIC_SUPABASE_URL" || key === "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
      missing.add(key);
    }
  }

  return {
    configured: false,
    missing: Array.from(missing),
    message:
      "Supabase is not configured yet. Add the public Supabase URL and anon key to .env.local and Vercel.",
  };
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig();

  if (!config.configured) {
    throw new Error(`${config.message} Missing: ${config.missing.join(", ")}`);
  }

  return config;
}
