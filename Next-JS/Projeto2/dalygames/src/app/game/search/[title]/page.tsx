import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/gamecard";

async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
}

export default async function Search({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />

        <h1 className="folt-bold text-xl mt-8 mb-5">
          Veja o que encontramos na nossa base:
        </h1>

        {!games && <p>Esse jogo não foi encontrado...</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((game) => <GameCard key={game.id} data={game} />)}
        </section>
      </Container>
    </main>
  );
}
