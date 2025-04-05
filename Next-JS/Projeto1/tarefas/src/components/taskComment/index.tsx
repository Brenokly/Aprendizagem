"use client";
import styles from "./styles.module.css";
import { TextArea } from "@/components/textarea";
import { Session } from "next-auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../services/firebaseConnection";
import { FaTrash } from "react-icons/fa";
import {
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

// Tipo da sua tarefa
interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

// Props do componente
interface DashboardClientProps {
  task: TaskProps;
  session: Session | null;
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export default function TaskComment({ task, session }: DashboardClientProps) {
  const [input, setInput] = useState<string>("");
  const [allComments, setAllComments] = useState<CommentProps[]>([]);

  async function handleComment(e: FormEvent) {
    e.preventDefault();

    if (input === "") {
      toast.error("Preencha o campo para enviar um comentário!");
      return;
    }

    if (!session?.user?.email || !session?.user?.name) {
      toast.error("Você precisa estar logado para comentar!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: task?.id,
      });

      const newComment = {
        id: docRef.id,
        comment: input,
        taskId: task?.id,
        user: session?.user?.email,
        name: session?.user?.name,
      };
      setAllComments((prev) => [...prev, newComment]);
      setInput("");
      toast.success("Commentário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      toast.error("Erro ao enviar comentário!");
    }
  }

  useEffect(() => {
    async function fetchComments() {
      if (!session?.user?.email) {
        return;
      }

      try {
        const q = query(
          collection(db, "comments"),
          where("taskId", "==", task.id)
        );
        const querySnapshot = await getDocs(q);

        const allComments: CommentProps[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allComments.push({
            id: doc.id,
            comment: data.comment,
            taskId: data.taskId,
            user: data.user,
            name: data.name,
          });
        });

        setAllComments(allComments);
      } catch (error) {
        toast.error("Erro ao buscar comentários!");
        console.error("Erro ao buscar comentários:", error);
      }
    }

    fetchComments();
  }, []);

  async function handleDeleteComment(id: string) {
    if (!session?.user?.email) {
      toast.error("Você precisa estar logado para excluir um comentário!");
      return;
    }

    try {
      const commentRef = doc(db, "comments", id);
      await deleteDoc(commentRef);
      
      setAllComments(allComments.filter((item) => item.id !== id));
      toast.success("Comentário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      toast.error("Erro ao excluir comentário!");
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar Comentário</h2>

        <form onSubmit={handleComment}>
          <TextArea
            placeholder="Escreva seu comentário..."
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
          />

          <button
            type="submit"
            className={styles.button}
            disabled={!session?.user}
          >
            Enviar Comentário
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos Comentários</h2>

        {allComments.length === 0 && (
          <div className={styles.noComments}>
            <p>Nenhum comentário encontrado.</p>
          </div>
        )}

        {allComments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === session?.user?.email && (
                <button
                  className={styles.buttonTrash}
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <FaTrash size={18} color="#EA3140" />
                </button>
              )}
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
