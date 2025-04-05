import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TaskComment from "@/components/taskComment";

export const metadata = {
  title: "Tarefa",
  description: "Detalhes da tarefa",
};

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

interface TaskPageProps {
  params: { id: string };
}

export default async function Task({ params }: TaskPageProps) {
  const { id } = await params;
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    redirect("/");
  }

  const data = snapshot.data();

  if (!data.public) {
    redirect("/");
  }

  const session = await getServerSession(authOptions);

  const task: TaskProps = {
    id: snapshot.id,
    created: data.created.toDate(),
    public: data.public,
    tarefa: data.tarefa,
    user: data.user,
  };

  return <TaskComment task={task} session={session} />;
}
