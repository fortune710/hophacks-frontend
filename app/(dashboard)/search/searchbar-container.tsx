"use client"

import { Searchbar } from "@/components/ui/searchbar"
import { useRouter } from "next/navigation";
import { useState } from "react"

export function SearchbarContainer({ defaultValue }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue);
    const router = useRouter();

    return (
        <Searchbar
            value={defaultValue}
            onSubmit={() => {
                router.push(`/search?query=${value}`)
            }}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}