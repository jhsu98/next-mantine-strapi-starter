import { DashboardAppShell } from "components/layouts/DashboardAppShell/DashboardAppShell";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAppShell>{children}</DashboardAppShell>;
}
