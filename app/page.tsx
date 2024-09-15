import { BackgroundLines } from "@/components/ui/background-lines";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          immerXiv Insights, <br /> Trending Research.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Discover emerging topics and track
          the pulse of academic research in real time.
          Simplify your literature review with smart insights.        
        </p>
        <a className="bg-primary text-white mx-auto mt-4 z-50 flex items-center justify-center rounded-md py-3 w-1/5 font-semibold cursor-pointer" href="/api/auth/login?returnTo=/home">
          Login
        </a>
      </BackgroundLines>    
    </>
  );
}
