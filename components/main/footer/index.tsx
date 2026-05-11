import Link from 'next/link';

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L2.25 2.25h6.926l4.259 5.63 5.809-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.642-2.05 1.41-1.559 1.643-3.touchstart 1.643-4.593v-.1c-.013-1.024-.03-2.08-.7-2.977a4.275 4.275 0 0 0-1.663-1.416c-.334 3.044-2.22 4.83-5.605 5.04-2.394.147-4.614-.972-4.614-3.567 0-2.634 2.202-3.839 4.682-3.92 1.195-.04 2.297.14 3.215.541V9.93c0-.867-.693-1.393-1.838-1.393-1.046 0-1.736.463-2.107 1.039l-1.735-1.085c.702-1.09 2.01-1.8 3.842-1.8 2.383 0 3.7 1.11 3.7 3.05v6.112c0 2.3-.544 4.149-1.962 5.694-1.389 1.513-3.453 2.341-6.066 2.363Zm-.483-9.705c-1.553 0-2.682.614-2.682 1.92 0 1.24.962 1.854 2.4 1.768 1.984-.12 3.088-1.224 3.088-2.996v-.383a8.48 8.48 0 0 0-2.806-.309Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com', icon: XIcon },
  { label: 'Threads', href: 'https://threads.net', icon: ThreadsIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YouTubeIcon },
] as const;

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Left: Logo + Social Icons */}
        <div className="flex items-center gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-md">
              F
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
              Face Blur
            </span>
          </Link>

          {/* Divider */}
          <div className="h-4 w-px bg-white/20" />

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Nav Links */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
