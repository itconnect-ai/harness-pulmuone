import { HarnessDashboard } from "@/components/home/HarnessDashboard";
import { getSupabaseConfig } from "@/lib/config/env";

export default function Home() {
  return <HarnessDashboard supabase={getSupabaseConfig()} />;
}
