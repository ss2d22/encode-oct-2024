export function Footer() {
  return (
    <footer className="bg-[#171717] h-1/4 ">
      <div className="max-w-7xlmx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="flex flex-row space-x-60"></div>
          <div className="px-5 py-2">
            <a
              href="/privacy-policy"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Privacy Policy
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="/terms-of-use"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Terms of Use
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Sociala
            href="#"
            aria-label="github"
            icon={
              <img
                src="assets/github-logo.png"
                alt="git"
                width={32}
                height={32}
              />
            }
          />
          <Sociala
            href="#"
            aria-label="X"
            icon={
              <img src="/assets/x-logo.png" alt="X" width={32} height={32} />
            }
          />
          <Sociala
            href="#"
            aria-label="Discord"
            icon={
              <img
                src="/assets/discord-logo.png"
                alt="Discord"
                width={32}
                height={32}
              />
            }
          />
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} StarLent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Sociala({
  href,
  icon,
  "aria-label": ariaLabel,
}: {
  href: string;
  icon: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-gray-500"
      aria-label={ariaLabel}
    >
      <span className="sr-only">{ariaLabel}</span>
      {icon}
    </a>
  );
}
