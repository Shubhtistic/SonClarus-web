import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas px-6 py-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: Logo + thanks */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="body-sm max-w-sm text-body">
              Thanks for visiting Sonclarus. Built with passion by
              <a
                href="https://github.com/Shubhtistic"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-accent-blue underline underline-offset-2 hover:text-on-dark"
              >
                Shubham Pawar
              </a>
              — a backend engineer who loves building scalable systems.
            </p>
          </div>

          {/* Right: Shubham's intro */}
          <div className="flex flex-col gap-3">
            <p className="body-sm-strong text-on-dark">
              🐼 Shubham Pawar
            </p>
            <p className="caption-sm text-mute">
              <span className="rounded-xs bg-surface-elevated px-2 py-0.5 text-body">
                DOING BACKEND STUFF
              </span>
            </p>
            <p className="body-sm text-body">
              Backend Engineer building scalable systems with Python, FastAPI,
              Docker, and AWS. I architect APIs from the ground up — designing
              efficient data models, implementing async processing, and deploying
              containerized services that handle real-world load.
            </p>
            <div className="mt-2 flex gap-3">
              <a
                href="https://www.linkedin.com/in/shubhtistic"
                target="_blank"
                rel="noopener noreferrer"
                className="body-sm text-mute transition-colors hover:text-on-dark"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/shubhtistic/"
                target="_blank"
                rel="noopener noreferrer"
                className="body-sm text-mute transition-colors hover:text-on-dark"
              >
                Instagram
              </a>
              <a
                href="https://github.com/Shubhtistic"
                target="_blank"
                rel="noopener noreferrer"
                className="body-sm text-mute transition-colors hover:text-on-dark"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline-soft pt-6">
          <p className="body-sm text-mute text-center">
            &copy; {new Date().getFullYear()} Sonclarus. All rights reserved.
            Built with ❤️ and too much coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
