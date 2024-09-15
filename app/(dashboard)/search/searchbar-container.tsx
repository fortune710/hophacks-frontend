"use client"

import { Searchbar } from "@/components/ui/searchbar"
import { useRouter } from "next/navigation";
import { useState } from "react"

export function SearchbarContainer({ defaultValue }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue);
    const router = useRouter();

    const handleSearch = () => {
        if (value.trim()) {
            router.push(`/search?query=${encodeURIComponent(value.trim())}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Searchbar
            value={value}
            onSubmit={handleSearch}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
        />
    )
}