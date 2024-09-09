"use client";

import { InlinePicker } from "@/components/picker/Picker";
import { useState } from "react";

export default function Home() {
  const [bpm1, setBpm1] = useState(128);
  const [bpm2, setBpm2] = useState(128);

  return (
    <div className="flex flex-col items-center justify-items-center h-screen overflow-hidden p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start flex-grow">
        <div className="list-inside list-decimal text-sm flex w-full flex-col align-center text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Beatmatch Calculator
          </h1>
          <div className="mb-2 text-center">
            Calculate PITCH ADJ value based on track BPMs{" "}
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-8">
          <div className="flex flex-row gap-20">
            <div>
              <div className="text-center">Track 1</div>
              <div className="h-40 overflow-y-scroll no-scrollbar">
                <InlinePicker onNewBpm={setBpm1} />
              </div>
            </div>
            <div>
              <div className="text-center">Track 2</div>
              <div className="h-40 overflow-y-scroll no-scrollbar">
                <InlinePicker onNewBpm={setBpm2} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-center mb-2">Pitch Adjustment Value</div>
              <div className="text-4xl font-bold text-center">
                {Math.round((100 * (bpm1 - bpm2)) / (bpm2 * 0.01)) / 100}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full bg-transparent text-slate-100 flex flex-col gap-6 items-center justify-center p-4">
        <div className="flex text-sm items-center gap-1">
          © {new Date().getFullYear()}
          <a
            className="flex items-center text-center text-sm gap-2 hover:underline hover:underline-offset-4"
            href="https://www.narvidas.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Mark Narvidas`}
          </a>
        </div>
        <div className="flex text-xs text-slate-300 items-center gap-1">
          Special thanks to
          <a
            href="https://www.reddit.com/r/Beatmatch/comments/r1qy8j/the_beatmatching_formula_pitch_adjustment_a_b_b/"
            target="_blank"
            className="hover:underline hover:underline-offset-4"
            rel="noopener noreferrer"
          >
            this
          </a>
          reddit post for the idea.
        </div>
      </footer>
    </div>
  );
}
