import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { theme } from '../theme'

const { colors, fonts, stores } = theme

// Fix Leaflet's default icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function StoreList({ onBook }) {
  return (
    <div style={{
      width: '340px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      overflowY: 'auto',
    }}>
      {stores.map(store => (
        <div
          key={store.id}
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: colors.goldLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '16px',
            }}>
              ◉
            </div>
            <div>
              <h3 style={{
                fontFamily: fonts.heading,
                fontSize: '17px',
                fontWeight: 'normal',
                color: colors.black,
                marginBottom: '4px',
              }}>
                {store.state}
              </h3>
              <p style={{
                fontFamily: fonts.body,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: '1.6',
              }}>
                {store.address}<br />
                {store.city}
              </p>
            </div>
          </div>

          <button
            onClick={() => onBook(store.id)}
            style={{
              fontFamily: fonts.body,
              backgroundColor: colors.black,
              color: colors.gold,
              border: 'none',
              borderRadius: '4px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              transition: 'background 0.2s',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = colors.goldDark}
            onMouseLeave={e => e.target.style.backgroundColor = colors.black}
          >
            Book Appointment →
          </button>
        </div>
      ))}
    </div>
  )
}

function StoreMap() {
  return (
    <div style={{ flex: 1, minWidth: 0, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${colors.border}` }}>
      <MapContainer
        center={[40.2, -74.5]}
        zoom={7}
        style={{ height: '100%', width: '100%', minHeight: '480px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.map(store => (
          <Marker key={store.id} position={[store.lat, store.lng]}>
            <Popup>
              <strong>{store.state}</strong><br />
              {store.address}<br />
              {store.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default function Stores({ onNavigateToAppointments }) {
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
          Our Locations
        </h2>
        <p style={{
          fontFamily: fonts.body,
          color: colors.textMuted,
          fontSize: '15px',
        }}>
          Four boutiques across the East Coast — find one near you
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px',
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
      }}>
        <StoreList onBook={onNavigateToAppointments} />
        <StoreMap />
      </div>
    </div>
  )
}
