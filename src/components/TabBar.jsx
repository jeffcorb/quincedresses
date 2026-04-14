import { theme } from '../theme'

const { colors, fonts } = theme

const TABS = [
  { id: 'home',         label: 'Home' },
  { id: 'catalog',      label: 'Catalog' },
  { id: 'stores',       label: 'Stores' },
  { id: 'appointments', label: 'Appointments' },
]

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: colors.white,
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                fontFamily: fonts.body,
                fontSize: '15px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? colors.goldDark : colors.textMuted,
                padding: '16px 24px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `3px solid ${colors.gold}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
