export const metadata = { title: "Studio", robots: { index: false, follow: false } };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[200] bg-white">{children}</div>;
}
