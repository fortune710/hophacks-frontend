"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import React from 'react';
import { Input } from './input';

interface SearchbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props here
}

export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className={className}
          ref={ref}
          {...props}
        />
        {/* Add any search icon or additional elements here */}
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';
