import suhailLogo from '../assets/suhail-logo-white.png'

interface SplashScreenProps {
  onStart: () => void
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div
      onClick={onStart}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onStart()
      }}
      role="button"
      tabIndex={0}
      aria-label="Open Suhail"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'linear-gradient(180deg, #0E4A46 0%, #0A3535 100%)',
        color: '#F8F7F2',
        outline: 'none',
      }}
    >
      {/* The supplied logo is used directly and is not redrawn, filtered, or restyled. */}
      <main
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          width: '100%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 36px',
          textAlign: 'center',
        }}
      >
        <img
          src={suhailLogo}
          alt="Suhail guiding-star logo"
          width={177}
          height={143}
          draggable={false}
          style={{
            display: 'block',
            width: 177,
            height: 'auto',
            marginBottom: 30,
          }}
        />

        <h1
          lang="ar"
          dir="rtl"
          style={{
            margin: 0,
            color: '#F8F7F2',
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: 0,
          }}
        >
          سُهَيْل
        </h1>

        <div
          aria-label="Suhail"
          style={{
            marginTop: 6,
            color: 'rgba(248,247,242,0.78)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '0.34em',
            paddingLeft: '0.34em',
          }}
        >
          SUHAIL
        </div>
      </main>

      {/* Quiet wayfinding motif, deliberately secondary to the brand. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 390 180"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: 260,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M-18 150 C56 150 61 91 122 91 H205 C250 91 252 38 310 38 H412"
          fill="none"
          stroke="#D7BF88"
          strokeWidth="1"
          strokeOpacity="0.16"
        />
        <path
          d="M-8 166 C82 166 83 112 143 112 H222 C270 112 279 66 329 66 H407"
          fill="none"
          stroke="#F8F7F2"
          strokeWidth="0.75"
          strokeOpacity="0.08"
        />
        <circle cx="122" cy="91" r="2.5" fill="#D7BF88" fillOpacity="0.22" />
        <circle cx="310" cy="38" r="2.5" fill="#D7BF88" fillOpacity="0.22" />
      </svg>

      <p
        lang="ar"
        dir="rtl"
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 188,
          zIndex: 1,
          margin: 0,
          color: 'rgba(248,247,242,0.64)',
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        دليلك إلى وجهتك
      </p>
    </div>
  )
}
