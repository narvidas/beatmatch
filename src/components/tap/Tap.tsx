import { FC, useState } from "react";

type Props = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type Ripple = { x: number; y: number; size: number };

export const Tap: FC<Props> = ({ children, onClick }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const size = Math.max(button.clientWidth, button.clientHeight) * 1.2; // Make the ripple larger than the button

    // Always center the ripple
    const x = (button.clientWidth - size) / 2;
    const y = (button.clientHeight - size) / 2;

    const newRipple = { x, y, size };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    if (onClick) onClick(e);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 200); // Duration should match the animation duration
  };

  return (
    <button
      onClick={handleClick}
      className={`w-24 h-24 rounded-full bg-white text-black font-bold shadow-lg hover:shadow-xl transition-shadow relative`}
    >
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="absolute bg-white opacity-50 rounded-full transform scale-0 animate-ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
      {children}
    </button>
  );
};
