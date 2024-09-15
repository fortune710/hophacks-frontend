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
              pathname.includes("/home")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>

        <Link
          href="/predictions"
          className={cn(
            "transition-colors hover:text-foreground",
            pathname === "/predictions" ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Predictions
        </Link>
        <Link
          href="/maps"
          className={cn(
            "transition-colors hover:text-foreground",
            pathname.includes("/maps")
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Maps
        </Link>
        </>
    )
}