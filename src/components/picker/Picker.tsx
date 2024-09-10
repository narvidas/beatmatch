import { FC, useEffect, useRef, useState } from "react";
import Picker from "react-mobile-picker";

function renderOptions(options: string[], selectedColor: string) {
  return options.map((option) => (
    <Picker.Item key={option} value={option}>
      {({ selected }) => (
        <div className={selected ? `font-semibold ${selectedColor}` : "text-neutral-400"}>{option}</div>
      )}
    </Picker.Item>
  ));
}

const generateBpmValues = (showDecimals: boolean) => {
  if (showDecimals) {
    return Array.from({ length: 321 }, (_, i) => (i * 0.5 + 40).toFixed(1)).map(String);
  }
  return Array.from({ length: 161 }, (_, i) => i + 40).map(String);
};

type InlinePickerProps = {
  defaultBpm?: number;
  onNewBpm: (newBpm: number) => void;
  showDecimals?: boolean;
};

export const InlinePicker: FC<InlinePickerProps> = ({ onNewBpm, defaultBpm, showDecimals = false }) => {
  const defaultValue = defaultBpm ? (showDecimals ? defaultBpm.toFixed(1) : String(Math.round(defaultBpm))) : "128";
  const [bpm, setBpm] = useState({ value: defaultValue });

  useEffect(() => {
    if (defaultBpm) {
      setBpm({ value: showDecimals ? defaultBpm.toFixed(1) : String(Math.round(defaultBpm)) });
    }
  }, [defaultBpm, showDecimals]);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      // Prevent the page from scrolling while interacting with the picker
      if (pickerRef.current && pickerRef.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const bpmValues = generateBpmValues(showDecimals);

  return (
    <div ref={pickerRef}>
      <Picker
        className="px-4"
        height={120}
        value={bpm}
        onChange={(newBpm) => {
          setBpm(newBpm);
          onNewBpm && onNewBpm(Number(newBpm.value));
        }}
        wheelMode="normal"
      >
        <Picker.Column name="value">{renderOptions(bpmValues, "text-white")}</Picker.Column>
      </Picker>
    </div>
  );
};
