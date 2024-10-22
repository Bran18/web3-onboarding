'use client'

import { cn } from '@/lib/utils';
import { LayoutProps } from './types';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const MainContent = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="sticky top-0 z-50 border-b bg-background h-14 px-4 flex items-center md:hidden">
        <SidebarTrigger />
      </div>
      <main className={cn(
        "flex-1",
        "px-4 sm:px-6 lg:px-8 py-6",
        "overflow-y-auto",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};