"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

type AnagramsInputProps = {
  input: string[];
};

const AnagramsInput = ({ input }: AnagramsInputProps) => {
  const [letters, setLetters] = useState<string[]>(input);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (letters.length === 6) {
      router.replace(`?input=${letters.join("")}`);
      router.refresh();
    }
  };

  const onLetterInput = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    let letter = e.target.value;
    letter = letter.substring(letter.length - 1, letter.length);

    if (!/[a-zA-Z]/.test(letter)) return;
    const newLetters = [...letters];
    newLetters[i] = letter.toUpperCase();
    setLetters(newLetters);

    if (i !== letters.length - 1) {
      inputs.current[i + 1]?.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      console.log("test");
      const newLetters = [...letters];
      newLetters.splice(i, 1);
      newLetters.push("");
      setLetters(newLetters);

      if (i !== 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      {letters.map((l, i) => (
        <input
          key={i}
          type="text"
          value={l}
          onKeyDown={(e) => onKeyDown(e, i)}
          onChange={(e) => onLetterInput(e, i)}
          className="input input-bordered input-primary w-14 text-center max-w-xs mb-2"
          ref={(ref) => {
            inputs.current.push(ref);
          }}
        />
      ))}
      <button type="submit" className="btn btn-primary">
        Generate
      </button>
    </form>
  );
};

export default AnagramsInput;
