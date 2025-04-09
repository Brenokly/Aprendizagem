import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import Image from "next/image";
import { GameCard } from "@/components/gamecard";

async function getData(id: string) {
  try {
    const decodeTitle = decodeURI(id);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${decodeTitle}`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
}

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game: GameProps = await getData(id);
  var gameSorted: GameProps = await getGameSorted();

  while (gameSorted === game) {
    gameSorted = await getGameSorted();
  }

  if (!game) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      <Container>
        <div className="bg-black h-80 sm:h-96 w-full relative">
          <Image
            className="rounded-lg object-cover w-full h-80 sm:h-96" // object-cover serve para cobrir o espaço disponível mantando a proporção
            src={game.image_url}
            alt={game.title}
            priority={true}
            fill={true}
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </div>

        <h1 className="text-xl font-bold my-4">{game.title}</h1>
        <p className="text-gray-700 my-4 text-justify">{game.description}</p>

        <h2 className="font-bold text-lg mt-7">Categorias:</h2>
        <Label dataProps={game.categories} />

        <h2 className="font-bold text-lg mt-7 mb-2">
          Plataformas disponíveis:
        </h2>
        <Label dataProps={game.platforms} />

        <p className="mt-7 mb-2">
          <strong>Data de lançamento: </strong>
          {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo Recomendado:</h2>
        <div className="flex-grow">
          <GameCard data={gameSorted} />
        </div>
      </Container>
    </main>
  );
}
