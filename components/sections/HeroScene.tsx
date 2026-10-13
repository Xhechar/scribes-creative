const INK = "#160f3a";
const PURPLE = "#5241c5";
const AMBER = "#e68e66";
const RED = "#cf564d";
const PAPER = "#F7F4EE";
const SLATE = "#5B5F73";

function rise(delay: number) {
  return { animationDelay: `${delay}s` } as const;
}

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 560"
      role="img"
      aria-label="A Scribes print studio: a printed banner above a counter of T-shirts, a mug, a cap and business cards, with a roll-up stand, a logo being designed and stickers on the wall"
      className={className}
    >
      <defs>
        <clipPath id="hs-clip">
          <rect width="720" height="560" rx="28" />
        </clipPath>
        <pattern id="hs-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="1.6" fill={PURPLE} opacity="0.2" />
        </pattern>
        <linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3F0FD" />
          <stop offset="1" stopColor="#E4DFF7" />
        </linearGradient>
      </defs>

      <g clipPath="url(#hs-clip)">
        {/* Room */}
        <rect width="720" height="440" fill="url(#hs-wall)" />
        <rect width="720" height="440" fill="url(#hs-dots)" opacity="0.55" />
        <rect y="440" width="720" height="120" fill="#D8D1F1" />
        <rect y="440" width="720" height="3" fill={PURPLE} opacity="0.14" />

        {/* ── Banner: large-format print ── */}
        <g className="hs-rise" style={rise(0.1)}>
          <path d="M96 0V40M624 0V40" stroke={INK} strokeWidth="3" />
          <rect x="76" y="48" width="580" height="96" rx="8" fill={INK} opacity="0.14" />
          <rect x="70" y="36" width="580" height="96" rx="8" fill={PURPLE} />
          <rect x="80" y="46" width="560" height="76" rx="4" fill="none" stroke="#fff" strokeOpacity="0.28" strokeDasharray="5 5" />
          {[
            [88, 54],
            [632, 54],
            [88, 114],
            [632, 114],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill={PAPER} stroke={INK} strokeWidth="2" />
          ))}
          <text
            x="360"
            y="92"
            textAnchor="middle"
            fontSize="46"
            fontWeight="800"
            letterSpacing="1"
            fill="#fff"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            YOUR BRAND HERE
          </text>
          <rect x="250" y="104" width="220" height="5" rx="2.5" fill={AMBER} />
        </g>

        {/* ── Roll-up stand ── */}
        <g className="hs-rise" style={rise(0.25)}>
          <ellipse cx="108" cy="486" rx="82" ry="8" fill={INK} opacity="0.16" />
          <rect x="52" y="176" width="112" height="296" rx="4" fill="#fff" />
          <rect x="52" y="176" width="112" height="112" fill={PURPLE} />
          <circle cx="108" cy="232" r="34" fill={AMBER} />
          <circle cx="108" cy="232" r="17" fill="#fff" />
          <rect x="48" y="170" width="120" height="10" rx="5" fill={INK} />
          <rect x="68" y="308" width="80" height="9" rx="4.5" fill={INK} />
          <rect x="68" y="326" width="60" height="6" rx="3" fill={SLATE} opacity="0.45" />
          <rect x="68" y="338" width="70" height="6" rx="3" fill={SLATE} opacity="0.45" />
          <rect x="68" y="384" width="76" height="22" rx="11" fill={RED} />
          <rect x="82" y="393" width="48" height="4" rx="2" fill="#fff" opacity="0.9" />
          <rect x="36" y="466" width="144" height="16" rx="8" fill={INK} />
        </g>

        {/* ── Logo being designed (framed sketch with bezier handles) ── */}
        <g className="hs-rise" style={rise(0.4)}>
          <rect x="228" y="168" width="130" height="130" rx="10" fill={INK} opacity="0.12" />
          <rect x="222" y="162" width="130" height="130" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
          <path
            d="M287 188C318 188 332 212 324 236C316 262 270 270 256 244C244 222 258 188 287 188Z"
            fill={AMBER}
          />
          <path
            d="M287 188C318 188 332 212 324 236C316 262 270 270 256 244C244 222 258 188 287 188Z"
            fill="none"
            stroke={PURPLE}
            strokeWidth="1.6"
          />
          <g stroke={PURPLE} strokeWidth="1.4">
            <line x1="287" y1="188" x2="310" y2="188" />
            <line x1="287" y1="188" x2="264" y2="190" />
            <line x1="324" y1="236" x2="320" y2="256" />
            <line x1="256" y1="244" x2="268" y2="258" />
          </g>
          <g fill={PURPLE}>
            <circle cx="310" cy="188" r="3" />
            <circle cx="264" cy="190" r="3" />
            <circle cx="320" cy="256" r="3" />
            <circle cx="268" cy="258" r="3" />
          </g>
          <g fill="#fff" stroke={PURPLE} strokeWidth="1.8">
            <rect x="283" y="184" width="8" height="8" />
            <rect x="320" y="232" width="8" height="8" />
            <rect x="252" y="240" width="8" height="8" />
          </g>
          <rect x="242" y="274" width="60" height="6" rx="3" fill={INK} />
          <rect x="308" y="274" width="24" height="6" rx="3" fill={SLATE} opacity="0.4" />
        </g>

        {/* ── Stickers ── */}
        <g className="hs-rise" style={rise(0.55)} stroke="#fff" strokeWidth="4" strokeLinejoin="round">
          <circle cx="404" cy="202" r="30" fill={AMBER} />
          <path
            d="M404 186L408.6 196.4L420 197.6L411.5 205.2L413.9 216.4L404 210.7L394.1 216.4L396.5 205.2L388 197.6L399.4 196.4Z"
            fill="#fff"
            stroke="none"
          />
          <g transform="rotate(10 467 205)">
            <rect x="438" y="176" width="58" height="58" rx="14" fill={PURPLE} />
            <circle cx="467" cy="205" r="13" fill="none" stroke="#fff" strokeWidth="5" />
          </g>
          <circle cx="428" cy="262" r="26" fill={RED} />
          <path d="M416 262L425 271L441 253" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* ── T-shirt on the wall ── */}
        <g className="hs-rise" style={rise(0.7)}>
          <path d="M590 196V182C590 168 608 166 610 154" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path
            d="M541 211L566 200Q590 218 614 200L639 211L681 253L653 273L639 255V335H541V255L527 273L499 253Z"
            fill={INK}
            opacity="0.13"
          />
          <path
            d="M536 206L566 196Q590 214 614 196L644 206L676 248L648 268L634 250V330H546V250L532 268L504 248Z"
            fill={INK}
          />
          <path d="M566 196Q590 214 614 196" fill="none" stroke={PURPLE} strokeWidth="5" strokeLinecap="round" />
          <g transform="translate(590 268)">
            <circle r="24" fill={AMBER} />
            <circle r="14" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke="#fff" strokeWidth="2" />
            <line x1="-24" y1="0" x2="24" y2="0" stroke="#fff" strokeWidth="2" />
          </g>
        </g>

        {/* ── Counter ── */}
        <g className="hs-rise" style={rise(0.85)}>
          <rect x="196" y="500" width="500" height="12" rx="6" fill={INK} opacity="0.14" />
          <rect x="204" y="408" width="484" height="94" fill="#241a5e" />
          <rect x="196" y="392" width="500" height="18" rx="6" fill={INK} />
          {[PURPLE, AMBER, RED, PAPER].map((c, i) => (
            <rect key={c} x={236 + i * 36} y="438" width="28" height="28" rx="4" fill={c} />
          ))}
          <g transform="translate(640 452)" stroke={PAPER} strokeOpacity="0.6" strokeWidth="1.6" fill="none">
            <circle r="16" />
            <line x1="0" y1="-22" x2="0" y2="22" />
            <line x1="-22" y1="0" x2="22" y2="0" />
          </g>

          {/* folded T-shirts */}
          <g stroke={INK} strokeWidth="2.5">
            <rect x="224" y="364" width="100" height="28" rx="6" fill={PURPLE} />
            <rect x="228" y="340" width="92" height="26" rx="6" fill={AMBER} />
            <rect x="232" y="316" width="84" height="26" rx="6" fill="#fff" />
            <path d="M262 316Q274 330 286 316" fill="none" strokeLinecap="round" />
          </g>

          {/* mug */}
          <g stroke={INK} strokeWidth="2.5">
            <path d="M408 352H418A14 14 0 0 1 418 380H408" fill="none" strokeWidth="5" strokeLinecap="round" />
            <rect x="352" y="340" width="56" height="52" rx="10" fill="#fff" />
            <rect x="352" y="358" width="56" height="18" fill={AMBER} />
            <circle cx="380" cy="367" r="5" fill="#fff" stroke="none" />
          </g>

          {/* cap */}
          <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" transform="translate(20 0)">
            <path d="M448 392C448 354 476 336 504 340C528 344 538 366 538 392Z" fill={PURPLE} />
            <path d="M494 340C490 358 492 376 494 392" fill="none" stroke="#fff" strokeOpacity="0.4" />
            <circle cx="472" cy="366" r="7" fill={AMBER} stroke="none" />
            <path d="M452 384C426 376 396 384 390 392H452Z" fill="#3a2f8f" />
            <circle cx="494" cy="339" r="4" fill={INK} stroke="none" />
          </g>

          {/* business cards */}
          <g transform="translate(16 0)">
          <g stroke={INK} strokeWidth="2.5">
            <rect x="565" y="336" width="90" height="56" rx="5" fill={AMBER} transform="rotate(-16 610 392)" />
            <rect x="565" y="336" width="90" height="56" rx="5" fill={PURPLE} transform="rotate(14 610 392)" />
            <rect x="565" y="336" width="90" height="56" rx="5" fill="#fff" />
          </g>
          <circle cx="585" cy="356" r="8" fill={PURPLE} />
          <rect x="598" y="350" width="44" height="5" rx="2.5" fill={INK} />
          <rect x="598" y="360" width="30" height="4" rx="2" fill={SLATE} opacity="0.5" />
          <rect x="574" y="376" width="60" height="3" rx="1.5" fill={SLATE} opacity="0.3" />
          </g>
        </g>
      </g>
    </svg>
  );
}