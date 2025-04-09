import { GameProps } from "@/utils/types/game";

type LabelProps = {
  dataProps: string[];
};

export function Label({ dataProps }: LabelProps) {
  return (
    <ul className="flex flex-wrap gap-2 my-5">
      {dataProps.map((data) => (
        <li key={data} className="text-black ml-4 px-4 bg-slate-200 rounded-lg hover:font-bold duration-200">
          {data}
        </li>
      ))}
    </ul>
  );
}
