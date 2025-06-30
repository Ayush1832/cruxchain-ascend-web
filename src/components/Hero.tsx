"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute top-[40%] left-0 w-full h-[60%] pointer-events-none">
            <svg
                className="w-full h-full text-neutral-300"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.03 + path.id * 0.015}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}

export function Hero() {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                Cruxchain
            </h1>
            <div className="mt-6 bg-white px-6 py-4 rounded-xl shadow-xl border border-neutral-200">
                <p className="text-xl font-semibold text-neutral-800">
                    The Intent-Centric Blockchain
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                    Interact on-chain with a single action.
                </p>
            </div>
            <div className="mt-6 relative">
                <div className="absolute inset-0 blur-2xl opacity-30 bg-[radial-gradient(circle,rgba(180,180,255,0.3),transparent_70%)]" />
                <Button className="relative z-10 bg-black text-white hover:bg-neutral-900 text-lg px-8 py-4 rounded-full shadow-xl">
                    Join Waitlist
                </Button>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
                Be the first to experience intent-driven blockchain interaction
            </p>
            <div className="mt-6 bg-neutral-100 border border-neutral-300 px-4 py-4 rounded-xl shadow-sm w-full max-w-md">
                <p className="text-xs text-neutral-500 mb-1">Example Intent:</p>
                <div className="bg-neutral-200 px-4 py-2 rounded text-blue-600 text-sm font-mono text-center">
                    "Swap 100 USDC → ETH"
                </div>
                <p className="text-xs text-neutral-400 text-center mt-1">
                    No gas setup, no chain selection needed
                </p>
            </div>
        </div>
    );
}

export default function HeroWithBackground() {
    return (
        <div className="relative w-full min-h-screen">
            <BackgroundPaths />
            <Hero />
        </div>
    );
}
