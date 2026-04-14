import { theme } from '../theme'

const { colors, fonts } = theme

const features = [
  {
    icon: '✦',
    title: 'Exclusive Designs',
    desc: 'Curated collections from the world\'s top quinceañera gown designers.',
  },
  {
    icon: '✂',
    title: 'Free Fitting',
    desc: 'Complimentary fitting sessions at all four of our boutique locations.',
  },
  {
    icon: '◈',
    title: '4 Locations',
    desc: 'New Jersey, New York City, Connecticut, and Virginia — serving the East Coast.',
  },
]

export default function Home({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        backgroundColor: colors.black,
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Background video placeholder */}
        <video
          src=""
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />

        {/* Gold overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(201,168,76,0.12) 100%)`,
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '60px 24px',
          maxWidth: '700px',
        }}>
          {/* Gold accent line */}
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: colors.gold,
            margin: '0 auto 24px',
          }} />

          <h1 style={{
            fontFamily: fonts.heading,
            color: colors.white,
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 'normal',
            lineHeight: '1.15',
            letterSpacing: '-0.5px',
            marginBottom: '20px',
          }}>
            Your Quinceañera,<br />
            <span style={{ color: colors.gold }}>Your Moment</span>
          </h1>

          <p style={{
            fontFamily: fonts.body,
            color: colors.goldLight,
            fontSize: '16px',
            lineHeight: '1.7',
            marginBottom: '36px',
            opacity: 0.9,
          }}>
            Discover breathtaking gowns crafted for your most unforgettable celebration.
            Four boutique locations. Exclusive designers. Your perfect dress awaits.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('catalog')}
              style={{
                fontFamily: fonts.body,
                backgroundColor: colors.gold,
                color: colors.black,
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = colors.goldDark}
              onMouseLeave={e => e.target.style.backgroundColor = colors.gold}
            >
              View Catalog
            </button>
            <button
              onClick={() => onNavigate('appointments')}
              style={{
                fontFamily: fonts.body,
                backgroundColor: 'transparent',
                color: colors.gold,
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '4px',
                border: `2px solid ${colors.gold}`,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.backgroundColor = colors.gold; e.target.style.color = colors.black }}
              onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = colors.gold }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section style={{
        backgroundColor: colors.cream,
        borderTop: `3px solid ${colors.gold}`,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '48px 32px',
                textAlign: 'center',
                borderRight: i < features.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <div style={{
                fontFamily: fonts.heading,
                color: colors.gold,
                fontSize: '28px',
                marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: fonts.heading,
                color: colors.black,
                fontSize: '18px',
                fontWeight: 'normal',
                marginBottom: '10px',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: fonts.body,
                color: colors.textMuted,
                fontSize: '14px',
                lineHeight: '1.7',
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
