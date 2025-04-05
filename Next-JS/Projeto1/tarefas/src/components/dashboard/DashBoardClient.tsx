"use client";
import { TextArea } from "@/components/textarea";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";

interface DashboardClientProps {
  email: string;
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export default function DashboardClient({ email }: DashboardClientProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", email)
      );

      onSnapshot(q, (snapshot) => {
        let lista: TaskProps[] = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            created: doc.data().created.toDate(),
            public: doc.data().public,
            tarefa: doc.data().tarefa,
            user: doc.data().user,
          });
        });

        setTasks(lista);
      });
    }

    loadTasks();
  }, [email]);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();

    if (input === "") {
      return;
    }

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: email,
        public: publicTask,
      });
      setInput("");
      setPublicTask(false);

      toast.success("Tarefa registrada com sucesso!");
    } catch (err) {
      toast.error("Erro ao registrar tarefa!");
    }
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("Tarefa deletada com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao deletar tarefa!");
      });
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );

    toast.success("Link copiado com sucesso!");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="Digite sua tarefa aqui"
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
              <div className={styles.checkboxarea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar Tarefa Pública?</label>
              </div>
              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>

          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PÚBLICO</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(item.id)}
                  >
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                {item.public ? (
                  <Link href={`/task/${item.id}`}>{item.tarefa}</Link>
                ) : (
                  <p>{item.tarefa}</p>
                )}
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
