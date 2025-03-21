import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { Globe, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Voyagr | AI Travel Planner',
  description: 'Personalized travel planning powered by artificial intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-zinc-950 font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <Link 
                  href="/" 
                  className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
                >
                  Voyagr
                </Link>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="/" 
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
                <Link 
                  href="/explore" 
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Explore
                </Link>
                <Link 
                  href="/my-trips" 
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  My Trips
                </Link>
                <Link 
                  href="/inspiration" 
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Inspiration
                </Link>
              </nav>
              
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="rounded-full bg-zinc-800/50 p-2 text-zinc-400 transition-colors hover:text-white border border-zinc-800"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">Profile</span>
                </Link>
                <button className="md:hidden rounded-full bg-zinc-800/50 p-2 text-zinc-400 transition-colors hover:text-white border border-zinc-800">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="container py-8">{children}</div>
          </main>

          <footer className="border-t border-zinc-800/50 bg-zinc-950">
            <div className="container py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-lg font-semibold tracking-tight">Voyagr</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    AI-powered travel planning for the modern explorer.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link href="/my-trips" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        My Trips
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/guides" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Travel Guides
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
                <p className="text-xs text-zinc-500">
                  © {new Date().getFullYear()} Voyagr. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>

        <Toaster 
          position="top-right" 
          theme="dark"
          toastOptions={{
            style: {
              background: 'hsl(240 10% 3.9%)',
              border: '1px solid hsl(240 3.7% 15.9%)',
              color: 'hsl(0 0% 98%)',
            },
          }}
        />
      </body>
    </html>
  );
}