"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Options() {
    const pathname = usePathname();

    return (
        <>
          <Link
            href="/home"
            className={cn(
              "transition-colors hover:text-foreground",
              pathname?.includes("/home")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>

        </>
    )
}