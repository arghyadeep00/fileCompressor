"use client";

import { Button } from "@/components/ui/button";
import { FileDown, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-foreground dark:bg-gray-900 px-6 py-15 flex flex-col items-center justify-center text-center transition-colors">
      {/* Hero Text */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-4">
          Instantly Reduce File Sizes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Compress PDF and image files, resize images, and optimize for sharing — all in one simple tool.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href={"/compress_pdf"} >
          <Button size="lg" className="gap-2 cursor-pointer">
            <FileDown size={18} />
            Compress PDF
          </Button>
          </Link>
          <Link href={"/resize_image"}>
          <Button size="lg" variant="secondary" className="gap-2 cursor-pointer">
            <ImageIcon size={18} />
            Resize Image
          </Button>
          </Link>
        </div>
      </div>

      {/* Animated Shrinking PDF Image */}
      <div className="mt-16 relative w-[200px] h-[280px]">
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 0.85, 0.7],
            opacity: [1, 0.9, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/pdf-placeholder.png" // Place your image in /public
            alt="Shrinking PDF"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-xl border-4 border-dashed border-green-500"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.6, 1],
            opacity: [0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </main>
  );
}
