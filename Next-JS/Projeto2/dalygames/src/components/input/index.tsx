"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 1. Criando schema de validação com zod
const searchSchema = z.object({
  input: z.string().min(1, "Digite algo para buscar."),
});

// 2. Criando o tipo TypeScript baseado no schema
type SearchData = z.infer<typeof searchSchema>;

export function Input() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
  });

  // 3. Função ao enviar o formulário
  function handleSearch(data: SearchData) {
    router.push(`/game/search/${data.input}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
    >
      <div className="relative w-11/12">
        <input
          {...register("input")}
          className="bg-slate-200 outline-none w-full"
          type="text"
          placeholder="Procurando algum jogo?..."
        />

        {/* Mensagem de erro */}
        {errors.input && (
          <p className="text-red-500 text-sm absolute left-0 top-full mt-1">
            {errors.input.message}
          </p>
        )}
      </div>

      <button type="submit">
        <BsSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
