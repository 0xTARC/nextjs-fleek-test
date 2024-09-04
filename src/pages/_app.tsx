import "../styles/globals.css";
import '@radix-ui/themes/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import "@rainbow-me/rainbowkit/styles.css";
import 'react-toastify/dist/ReactToastify.css'
import '~/app.css'

import type { AppProps } from "next/app";
import dynamic from 'next/dynamic'
import { HiDotsHorizontal as DotsIcon } from "react-icons/hi";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "~/wagmi";
import Link from "next/link";
import { NavLink } from "~/components/navlink";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "react-toastify";

// Type the `query.meta` property used in the QueryCache
declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      errorMessage?: (error: Error) => void;
      successMessage?: string;
      callback?: (...args: unknown[]) => void;
    };
  }
}

const NavLinks = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) => {
          const activeStyles = isActive
            ? "bg-slate-100 rounded-lg font-semibold"
            : "";
          return `text-slate-950 hover:text-slate-600 px-3 py-2 ${activeStyles}`;
        }}
        exact
        href="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          const activeStyles = isActive
            ? "bg-slate-100 rounded-lg font-semibold"
            : "";
          return `text-slate-950 hover:text-slate-600 px-3 py-2 ${activeStyles}`;
        }}
        href="/discover"
      >
        Discover
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          const activeStyles = isActive
            ? "bg-slate-100 rounded-lg font-semibold"
            : "";
          return `text-slate-950 hover:text-slate-600 px-3 py-2 ${activeStyles}`;
        }}
        href="/earn"
      >
        Earn
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          const activeStyles = isActive
            ? "bg-slate-100 rounded-lg font-semibold"
            : "";
          return `text-slate-950 hover:text-slate-600 px-3 py-2 ${activeStyles}`;
        }}
        href="/portfolio"
      >
        Portfolio
      </NavLink>
    </>
  );
};

function Header() {
  return (
    <header className="w-full border-b border-gray-200 flex justify-between items-center px-2 sm:px-4 h-12 py-2">
      <nav className="flex">
        <Link href="/">
          <img
            src="/logo.svg"
            alt={"Panoptic Earn Logo"}
            // The border-radius from rounded-full kinda cuts of the edges of square svgs, but whatever
            className={"w-8"}
          />
        </Link>
        <div className="hidden sm:block flex ml-4">
          <NavLinks />
        </div>
      </nav>
      <span className="flex">
        <div
          // `[&_button]:!shadow-none` disables box shadow on all button descendents of this div. This is an easy way to disable the box shadow on RainbowKit buttons
          className="[&_button]:!shadow-none -mr-2"
          style={{ transform: "scale(0.9)" }}
        >
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>

        <button className="hidden sm:block text-slate-950 hover:text-slate-600 px-3 py-2">
          <DotsIcon />
        </button>
      </span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="sm:hidden fixed bottom-0 w-full flex justify-evenly items-center py-2 h-12 border-t bg-white">
      <NavLinks />
    </footer>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query?.meta?.errorMessage) {
              toast.error(`Something went wrong: ${query.meta.errorMessage}`);
            }
          },
          onSuccess: (data, query) => {
            // Only show success toast on first success of each query
            if (
              query.state.dataUpdateCount === 1 &&
              query?.meta?.successMessage
            ) {
              toast.success(`${query?.meta?.successMessage}`);
            }

            if (query?.meta?.callback) {
              query?.meta?.callback?.();
            }
          },
        }),
      })
  ); // Create stable query client to prevent excessive re-renders

  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Theme grayColor="slate">
            <Header />
            <main className="px-2 py-6 sm:px-16 sm:py-12 ">
              <DynamicComponent {...pageProps} />
            </main>
            <Footer />
          </Theme>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
