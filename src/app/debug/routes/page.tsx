import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Debug Routes | Artli",
};

const routes = [
  { path: "/", label: "Top (Home)" },
  { path: "/works", label: "Works List" },
  { path: "/works/art-1", label: "Work Detail: 夜明けの浮遊城" },
  { path: "/works/art-3", label: "Work Detail: ネオン都市2087" },
  { path: "/artists", label: "Artists List" },
  { path: "/artists/artist-1", label: "Artist Detail: Yuki Tanaka" },
  { path: "/artists/artist-5", label: "Artist Detail: Sakura Ito" },
  { path: "/debug/routes", label: "Debug Routes (this page)" },
];

export default function DebugRoutesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="debug">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug: Route List</h1>
      <p className="text-sm text-gray-500 mb-6">
        各リンクをクリックして、ページソースの &lt;title&gt;、&lt;h1&gt;、data-page 属性がページごとに異なることを確認できます。
      </p>
      <ul className="space-y-3">
        {routes.map((route) => (
          <li key={route.path} className="flex items-center gap-4">
            <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 min-w-[200px]">
              {route.path}
            </code>
            <Link
              href={route.path}
              className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
