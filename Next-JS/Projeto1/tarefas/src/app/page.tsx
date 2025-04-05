import styles from "./styles/page.module.css";
import Image from "next/image";
import heroImg from "../../public/assets/hero.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

export const metadata = {
  title: "Tarefas+ | Organize suas tarefas de forma fácil",
};

export const revalidate = 120;

async function getDashboardData() {
  const [postsSnap, comentariosSnap] = await Promise.all([
    getDocs(collection(db, "tarefas")),
    getDocs(collection(db, "comments")),
  ]);

  return {
    totalPosts: postsSnap.size || 0,
    totalComentarios: comentariosSnap.size || 0,
  };
}

export default async function Home() {
  const { totalPosts, totalComentarios } = await getDashboardData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo tarefas"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{totalPosts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{totalComentarios} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
