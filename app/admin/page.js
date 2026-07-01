import { isAdminAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata = {
  title: "Admin | Garage 910",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
