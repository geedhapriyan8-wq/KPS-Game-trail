import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex">
      <Sidebar
        displayName={profile?.display_name ?? user.email ?? "Member"}
        username={profile?.username ?? "member"}
      />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
