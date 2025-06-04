"use client";
import { Orbit } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-card border-b border-border p-4 shadow-sm">
      <div className="container mx-auto flex items-center gap-2">
        <Orbit className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">MotorTwin</h1>
      </div>
    </header>
  );
}
