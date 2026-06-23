import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HarnessDashboard } from "@/components/home/HarnessDashboard";

describe("HarnessDashboard", () => {
  it("shows pending Supabase setup when public env vars are missing", () => {
    render(
      <HarnessDashboard
        supabase={{
          configured: false,
          missing: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
          message: "Supabase is not configured yet.",
        }}
      />,
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText(/NEXT_PUBLIC_SUPABASE_URL/)).toBeInTheDocument();
    expect(screen.getByText("개발 계획을 수립해")).toBeInTheDocument();
  });

  it("shows the Supabase host when the integration is configured", () => {
    render(
      <HarnessDashboard
        supabase={{
          configured: true,
          url: "https://example.supabase.co",
          anonKey: "public-anon-key-with-enough-length",
          host: "example.supabase.co",
        }}
      />,
    );

    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("example.supabase.co")).toBeInTheDocument();
  });
});
