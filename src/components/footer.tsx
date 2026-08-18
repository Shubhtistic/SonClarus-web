import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas px-6 py-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex items-center justify-between">
          <Logo />
          <p className="body-sm text-mute">
            &copy; {new Date().getFullYear()} Sonclarus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
