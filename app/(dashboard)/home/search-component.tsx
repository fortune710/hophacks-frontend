"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const placeholders = [
  "artificial intelligence",
  "transformers",
  "operating systems",
  "blockchain technology",
  "machine learning",
];

export function SearchComponent() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return router.push(`/search?query=${searchQuery}`)
    };

    return (
        <div className="h-[40rem] flex flex-col justify-center items-center px-4">
            <h2 className="mb-10 sm:mb-14 text-xl text-center sm:text-5xl dark:text-white text-black">
                Ask our AI Anything
            </h2>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}
