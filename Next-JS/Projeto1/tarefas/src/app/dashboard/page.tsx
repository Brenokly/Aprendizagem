import DashboardClient from "../../components/dashboard/DashBoardClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Meu Painel de tarefas",
};  

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return <DashboardClient email={session?.user?.email ?? ""} />;
}