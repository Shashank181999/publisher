export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the admin layout for the login page - render as full page without sidebar
  // Using fixed positioning to break out of parent flex container
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}
