import { FC, useState } from "react";
import Picker from "react-mobile-picker";

function renderOptions(options: string[], selectedColor: string) {
  return options.map((option) => (
    <Picker.Item key={option} value={option}>
      {({ selected }) => (
        <div
          className={
            selected ? `font-semibold ${selectedColor}` : "text-neutral-400"
          }
        >
          {option}
        </div>
      )}
    </Picker.Item>
  ));
}

const bpmValues = Array.from({ length: 161 }, (_, i) => i + 40).map(String);

type InlinePickerProps = {
  onNewBpm: (newBpm: number) => void;
};

export const InlinePicker: FC<InlinePickerProps> = ({ onNewBpm }) => {
  const [bpm, setBpm] = useState({ value: "128" });
  return (
    <Picker
      className="px-4"
      value={bpm}
      onChange={(newBpm) => {
        setBpm(newBpm);
        onNewBpm && onNewBpm(Number(newBpm.value));
      }}
      wheelMode="normal"
    >
      <Picker.Column name="value">
        {renderOptions(bpmValues, "text-white")}
      </Picker.Column>
    </Picker>
  );
};
