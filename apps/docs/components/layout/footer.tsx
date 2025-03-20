import { NpmIcon, GithubIcon, RehooksIcon } from "@rehooks/ui/icons";
import { GITHUB_LINK, REHOOKS_NPM } from "@rehooks/utils/constants";
import { cn } from "@rehooks/utils/functions";
import Link from "next/link";

export default async function Footer({ className }: { className?: string }) {
  const legal = [
    { title: "Terms of Service", link: "/docs/cli/legal/terms" },
    { title: "Privacy Policy", link: "/docs/cli/legal/privacy-policy" },
    { title: "Code Policy", link: "/docs/cli/legal/code-policy" },
  ];

  const TEXT_STYLE =
    "text-sm hover:underline text-fd-muted-foreground transition-colors";

  return (
    <footer
      className={cn(
        "border-t-fd-border bg-fd-background border-t py-12",
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-8">
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <RehooksIcon className="size-6" />
              <span className="text-xl font-semibold">Rehooks</span>
            </div>
            <p className="text-fd-muted-foreground max-w-lg text-balance">
              A CLI to scaffold your react custom hooks, with a focus on
              performance, reusability, and type-safety.
            </p>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2">
              {legal.map((item) => (
                <Link className={TEXT_STYLE} key={item.title} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-fd-border mt-8 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <div className="flex flex-row gap-4">
            <Link
              href={GITHUB_LINK}
              className="text-fd-muted-foreground hover:text-fd-foreground"
            >
              <GithubIcon className="size-5" />
              <span className="sr-only">Github</span>
            </Link>
            <Link
              href={REHOOKS_NPM}
              className="text-fd-muted-foreground hover:text-fd-foreground"
            >
              <NpmIcon className="size-5" />
              <span className="sr-only">NPM</span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-fd-muted-foreground mt-4 text-sm sm:mt-0">
            Copyright © {new Date().getFullYear()} Rehooks. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
