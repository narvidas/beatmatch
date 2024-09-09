"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Coffee } from "@/components/coffee/Coffee";
import { InlinePicker } from "@/components/picker/Picker";
import { usePersistedState } from "@/hooks/usePersistedState";

type Tab = "pitchAdj" | "bpm";

export default function Home() {
  const [bpm1, setBpm1] = usePersistedState("beatmatchin-bpm1", 128);
  const [bpm2, setBpm2] = usePersistedState("beatmatchin-bpm2", 128);
  const [activeTab, setActiveTab] = useState<Tab>("pitchAdj");
  const [bpm, setBpm] = useState<number | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const [isStale, setIsStale] = useState(false);
  const lastTapTime = useRef<number | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTaps = useCallback(() => {
    setTaps([]);
    lastTapTime.current = null;
    setIsStale(true);
  }, []);

  const handleTap = useCallback(() => {
    const now = Date.now();

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    setIsStale(false);

    if (lastTapTime.current) {
      const newTaps = [...taps, now - lastTapTime.current];
      setTaps(newTaps);

      if (newTaps.length >= 2) {
        const avgTimeBetweenTaps = newTaps.reduce((a, b) => a + b, 0) / newTaps.length;
        const calculatedBpm = Math.round(60000 / avgTimeBetweenTaps);
        setBpm(calculatedBpm);
      }
    }
    lastTapTime.current = now;

    resetTimeoutRef.current = setTimeout(resetTaps, 2200);
  }, [taps, resetTaps]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center h-screen overflow-hidden p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start flex-grow">
        <div className="flex justify-center items-center w-80">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex border-b border-gray-200 text-sm mb-8">
              <button
                className={`py-2 px-4 w-40 ${activeTab === "pitchAdj" ? "border-b-2 border-white-500" : "opacity-50"}`}
                onClick={() => setActiveTab("pitchAdj")}
              >
                Calculator
              </button>
              <button
                className={`py-2 px-4 w-40 ${activeTab === "bpm" ? "border-b-2 border-slate-500" : "opacity-50"}`}
                onClick={() => setActiveTab("bpm")}
              >
                Find BPM
              </button>
            </div>
            {activeTab === "pitchAdj" && (
              <>
                <div className="list-inside list-decimal text-sm flex w-full flex-col align-center text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                  {/* <h1 className="text-3xl font-bold mb-8 text-center">Beatmatch Calculator</h1> */}
                  <div className="mb-4 text-center">Calculate PITCH ADJ value based on track BPMs </div>
                </div>

                <div className="flex justify-center items-center w-full mt-8">
                  <div className="flex flex-row gap-20">
                    <div>
                      <div className="text-center">Track 1</div>
                      <div className="h-40 overflow-y-scroll no-scrollbar">
                        <InlinePicker onNewBpm={setBpm1} defaultBpm={bpm1} />
                      </div>
                    </div>
                    <div>
                      <div className="text-center">Track 2</div>
                      <div className="h-40 overflow-y-scroll no-scrollbar">
                        <InlinePicker onNewBpm={setBpm2} defaultBpm={bpm2} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-center mb-2">Pitch Adjustment Value</div>
                  <div className="text-4xl font-bold text-center">
                    {Math.round((100 * (bpm1 - bpm2)) / (bpm2 * 0.01)) / 100}
                  </div>
                </div>
              </>
            )}
            {activeTab === "bpm" && (
              <div className="text-center flex flex-col items-center">
                <p className="text-sm mb-24 font-[family-name:var(--font-geist-mono)]">Tap the button to find BPM</p>
                <div
                  className={`text-2xl font-bold mb-10 transition-colors duration-300 ${
                    isStale ? "text-gray-500" : ""
                  }`}
                >
                  {bpm ? `${bpm} BPM` : "-- BPM"}
                </div>
                <button
                  className="w-24 h-24 rounded-full bg-white text-black font-bold shadow-lg hover:shadow-xl transition-shadow"
                  onClick={handleTap}
                >
                  TAP
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full bg-transparent text-slate-100 opacity-50 flex flex-col gap-2 items-center justify-center p-4">
        <Coffee />
        <div className="flex text-sm gap-1">
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
        {activeTab === "pitchAdj" && (
          <div className="flex text-xs text-slate-100 items-center gap-1 opacity-70">
            Special thanks to
            <a
              href="https://www.reddit.com/r/Beatmatch/comments/r1qy8j/the_beatmatching_formula_pitch_adjustment_a_b_b/"
              target="_blank"
              className="hover:underline hover:underline-offset-4"
              rel="noopener noreferrer"
            >
              this
            </a>
            reddit post for the idea
          </div>
        )}
      </footer>
    </div>
  );
}
