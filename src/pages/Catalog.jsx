import { theme } from '../theme'

const { colors, fonts } = theme

const gowns = [
  { id: 1, name: 'Lilac Dream',     price: 890,  color: '#c8b4d4', badge: 'New Arrival',  textColor: '#5a3a6e' },
  { id: 2, name: 'Rose Royale',     price: 750,  color: '#e8b4bc', badge: 'Best Seller',  textColor: '#7a2a38' },
  { id: 3, name: 'Ocean Blue',      price: 1100, color: '#a8c4d8', badge: 'Limited',      textColor: '#1a3a5a' },
  { id: 4, name: 'Peach Blossom',   price: 820,  color: '#f0c4a0', badge: 'New Arrival',  textColor: '#7a3a10' },
  { id: 5, name: 'Emerald Grace',   price: 680,  color: '#a8d4b8', badge: 'On Sale',      textColor: '#1a5a38' },
  { id: 6, name: 'Golden Empress',  price: 1350, color: '#d4b870', badge: 'Exclusive',    textColor: '#5a3a00' },
]

function GownCard({ gown, onBook }) {
  return (
    <div
      onClick={onBook}
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Placeholder image */}
      <div style={{
        height: '280px',
        backgroundColor: gown.color,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Silhouette decoration */}
        <div style={{
          width: '80px',
          height: '160px',
          borderRadius: '50% 50% 30% 30% / 30% 30% 20% 20%',
          backgroundColor: 'rgba(255,255,255,0.25)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.35)',
          }} />
        </div>

        {/* Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          backgroundColor: gown.textColor,
          color: colors.white,
          fontSize: '11px',
          fontFamily: fonts.body,
          fontWeight: '600',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          {gown.badge}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontFamily: fonts.heading,
          fontSize: '18px',
          fontWeight: 'normal',
          color: colors.black,
          marginBottom: '6px',
        }}>
          {gown.name}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: fonts.body,
            fontSize: '20px',
            fontWeight: '600',
            color: colors.goldDark,
          }}>
            ${gown.price.toLocaleString()}
          </span>
          <span style={{
            fontFamily: fonts.body,
            fontSize: '12px',
            color: colors.gold,
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}>
            Book Fitting →
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Catalog({ onNavigate }) {
  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100%' }}>
      {/* Header */}
      <div style={{
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        padding: '48px 24px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: colors.gold,
          margin: '0 auto 16px',
        }} />
        <h2 style={{
          fontFamily: fonts.heading,
          fontSize: '32px',
          fontWeight: 'normal',
          color: colors.black,
          marginBottom: '10px',
        }}>
          Gown Collection
        </h2>
        <p style={{
          fontFamily: fonts.body,
          color: colors.textMuted,
          fontSize: '15px',
        }}>
          Click any gown to book a fitting appointment
        </p>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '40px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
      }}>
        {gowns.map(gown => (
          <GownCard
            key={gown.id}
            gown={gown}
            onBook={() => onNavigate('appointments')}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .catalog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
