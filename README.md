# 🎵 Beatmatch.in - BPM Calculator

> A nifty little tool for vinyl DJs to calculate pitch adjustments and find BPMs

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://beatmatch.in)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.8-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4)](https://tailwindcss.com/)

## 🌐 Live App

Visit [beatmatch.in](https://beatmatch.in) to use the application.

## 🎯 The Problem

Having a sizeable record collection, many vinyl DJs struggle with beatmatching, especially when transitioning between tracks with different BPMs. Unlike CDJs with visual waveform cues, vinyl mixing requires a more tactile approach and understanding of pitch adjustments.

## 💡 The Solution

**Beatmatch.in** provides two essential tools for vinyl DJs:

1. **Pitch Adjustment Calculator** - Calculate the exact pitch adjustment needed on your turntables based on track BPMs
2. **BPM Finder** - Tap to find the BPM of any playing track

### The Formula

The pitch adjustment calculation is based on this simple but effective formula:

```
Pitch Adjustment = (Track A BPM - Track B BPM) / (Track B BPM × 0.01)
```

*Special thanks to [this Reddit post](https://www.reddit.com/r/Beatmatch/comments/r1qy8j/the_beatmatching_formula_pitch_adjustment_a_b_b/) for the inspiration.*

## 🚀 Features

- **Dual-mode interface**: Switch between pitch calculator and BPM finder
- **Precise BPM selection**: Scroll through BPM values from 40-200 with optional decimal precision
- **Tap-to-find BPM**: Intelligent tap detection with automatic timeout and reset
- **Persistent state**: Your BPM selections are saved locally for convenience
- **Mobile-responsive**: Optimized for both desktop and mobile use
- **Clean, minimal UI**: Focus on functionality without distractions

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14.2.8](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React 18](https://react.dev/)** - Component-based UI library

## 🎮 How to Use

### Pitch Adjustment Calculator
1. Select the BPM of your currently playing track (Track 1)
2. Select the BPM of your incoming track (Track 2)  
3. The calculated pitch adjustment value will appear
4. Adjust your turntable's pitch control to this value as a starting point

### BPM Finder
1. Switch to the "Find BPM" tab
2. Play your track and tap the button on every beat
3. After a few taps, the BPM will be calculated and displayed
4. The baseline BPM will automatically reset after a couple of seconds of inactivity

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or compatible JavaScript runtime
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beatmatch.in.git
cd beatmatch.in
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
