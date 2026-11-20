import AdminClient from "./AdminClient";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function AdminPage() {
  return <AdminClient />;
}
