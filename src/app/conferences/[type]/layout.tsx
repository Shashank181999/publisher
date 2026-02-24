import { Metadata } from "next";

type Props = {
  params: Promise<{ type: string }>;
};

const titleMap: Record<string, string> = {
  conferences: "Conferences",
  webinars: "Webinars",
  seminars: "Seminars",
  workshops: "Workshops",
  upcoming: "Upcoming Events",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const title = titleMap[type] || "Events";

  return {
    title: `${title} | Great Britain Publishers`,
    description: `Browse our ${title.toLowerCase()} - academic and scientific events for researchers and healthcare professionals.`,
  };
}

export default function EventTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
