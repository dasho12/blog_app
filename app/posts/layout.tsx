import Nav from "./nav";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Nav />
      <main className="flex-1 p-8 ml-0 md:ml-64">{children}</main>
    </div>
  );
}
