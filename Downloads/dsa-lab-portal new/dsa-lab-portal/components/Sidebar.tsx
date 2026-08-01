"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TOTAL_TOPIC_COUNT, TOTAL_LAB_COUNT } from "@/lib/content";

export default function Sidebar({
  displayName,
  username,
}: {
  displayName: string;
  username: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const navItem = (href: string, label: string, emoji: string, badge?: number) => {
    const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
          active ? "bg-brand-100 text-brand-700" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <span className="flex items-center gap-2">
          <span>{emoji}</span>
          {label}
        </span>
        {badge !== undefined && (
          <span className="text-xs bg-white text-gray-500 border border-gray-200 rounded-full px-2 py-0.5">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-72 flex-shrink-0 border-r border-gray-100 bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-11 h-11 rounded-xl bg-brand-600 flex items-center justify-center text-white text-xl">
          🧪
        </div>
        <div>
          <h1 className="font-bold text-base leading-tight">DAC Lab Portal</h1>
          <p className="text-xs text-gray-500">AI & ML Learning Platform</p>
        </div>
      </div>

      <div className="p-6">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
            {displayName?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">@{username}</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1 flex-1">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Sections</p>
        {navItem("/topics", "Topics & Labs", "📚", TOTAL_TOPIC_COUNT)}
        {navItem("/badges", "My Badges", "🏅")}
        {navItem("/master-badge", "DAC Master Badge", "🏆")}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          🚪 Log out
        </button>
        <p className="text-[10px] text-gray-300 px-3 mt-2">{TOTAL_LAB_COUNT} labs across {TOTAL_TOPIC_COUNT} topics</p>
      </div>
    </aside>
  );
}
