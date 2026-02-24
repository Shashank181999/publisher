import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conferences & Events | Great Britain Publishers",
  description: "Join our scientific conferences, seminars, webinars, and workshops. Connect with researchers and practitioners worldwide.",
};

export default function ConferencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
