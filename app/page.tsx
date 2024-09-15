import { FloatingNav } from "@/components/ui/floating-navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <FloatingNav 
        navItems={[
          { link: "#solution", name: "Solution" }
        ]} 
      />

      <main>
        
      </main>
    
    </>
  );
}
