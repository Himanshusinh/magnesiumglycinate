// Line drawing of the bisglycinate chelate, in the style of a datasheet figure.
export default function StructureFigure() {
  return (
    <svg viewBox="0 0 520 330" role="img" aria-labelledby="fig-t" style={{ width: '100%', height: 'auto' }}>
      <title id="fig-t">Structure of magnesium bisglycinate: a magnesium ion bound to two glycine molecules through oxygen and nitrogen</title>
      <g stroke="#5c6580" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M260 165 L196 115 L132 133 L132 205 L196 222" />
        <path d="M132 133 L88 96 M137 128 L93 91" />
        <path d="M260 165 L324 115 L388 133 L388 205 L324 222" />
        <path d="M388 133 L432 96 M383 128 L427 91" />
      </g>
      <g stroke="#0041c8" strokeWidth="2.2" strokeDasharray="5 5">
        <path d="M260 165 L196 222 M260 165 L324 222" />
      </g>
      <g fontFamily="var(--font-head)" fontWeight="700" textAnchor="middle" dominantBaseline="central" fontSize="17">
        <g fill="#fff" stroke="#fff" strokeWidth="10">
          <circle cx="196" cy="115" r="9" />
          <circle cx="324" cy="115" r="9" />
          <circle cx="88" cy="94" r="9" />
          <circle cx="432" cy="94" r="9" />
          <circle cx="132" cy="133" r="8" />
          <circle cx="388" cy="133" r="8" />
          <rect x="108" y="195" width="48" height="20" />
          <rect x="364" y="195" width="48" height="20" />
          <rect x="172" y="212" width="48" height="20" />
          <rect x="300" y="212" width="48" height="20" />
        </g>
        <g fill="#c0263f">
          <text x="196" y="115">O</text>
          <text x="324" y="115">O</text>
          <text x="88" y="94">O</text>
          <text x="432" y="94">O</text>
        </g>
        <g fill="#33384a">
          <text x="132" y="133">C</text>
          <text x="388" y="133">C</text>
          <text x="132" y="205">CH₂</text>
          <text x="388" y="205">CH₂</text>
        </g>
        <g fill="#0041c8">
          <text x="196" y="222">NH₂</text>
          <text x="324" y="222">NH₂</text>
        </g>
        <circle cx="260" cy="165" r="26" fill="#0041c8" />
        <text x="260" y="165" fill="#fff" fontSize="19">
          Mg
        </text>
      </g>
      <g fontFamily="var(--font-body)" fontSize="12.5" fill="#737688" textAnchor="middle">
        <text x="132" y="262">glycine</text>
        <text x="388" y="262">glycine</text>
        <path d="M150 300 h30" stroke="#0041c8" strokeWidth="2" strokeDasharray="5 5" />
        <text x="270" y="300" dominantBaseline="central">
          coordinate bond (N → Mg)
        </text>
      </g>
    </svg>
  );
}
