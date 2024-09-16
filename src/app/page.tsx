import axios from "axios";
import AnagramsInput from "./components/AnagramsInput/index";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const letters = Array<string>(6).fill("");
  const input = searchParams["input"];
  let words: string[] = ["Enter Anagram..."];

  if (input && input.length === 6) {
    for (let i = 0; i < input.length && i < 6; i++) {
      letters[i] = input[i];
    }

    const res = await axios.get(
      `${process.env.ANAGRAMS_SERVER}${letters.join("").trim().toLowerCase()}`
    );

    if (res.data.data) {
      words = res.data.data as string[];
    } else {
      words = ["No Anagrams Found"];
    }
  }

  return (
    <div className="text-center text-primary pt-2">
      <h1 className="text-5xl font-extrabold">Anagrams</h1>
      <h1 className="text-5xl font-extrabold mb-4">Solver</h1>
      <AnagramsInput input={letters} />
      <ul className="mt-2 text-base-content">
        {words.map((w, i) => {
          w = w.substring(0, 1).toLocaleUpperCase() + w.substring(1);
          return <li key={i}>{w}</li>;
        })}
      </ul>
    </div>
  );
}
