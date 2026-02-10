export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLeads, getOperators } from "@/actions/admin";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const role = (session.user as { role: string }).role;
  const leads = await getLeads();
  const operators = role !== "OPERATOR" ? await getOperators() : [];

  return (
    <DashboardClient
      leads={JSON.parse(JSON.stringify(leads))}
      operators={JSON.parse(JSON.stringify(operators))}
      role={role}
    />
  );
}
