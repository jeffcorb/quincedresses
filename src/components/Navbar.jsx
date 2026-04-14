import { theme } from '../theme'

const { colors, fonts, brand } = theme

const styles = {
  navbar: {
    backgroundColor: colors.black,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '72px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  logo: {
    fontFamily: fonts.heading,
    color: colors.gold,
    fontSize: '22px',
    fontWeight: 'normal',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  tagline: {
    fontFamily: fonts.body,
    color: colors.goldLight,
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  contactItem: {
    fontFamily: fonts.body,
    color: colors.white,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  contactIcon: {
    color: colors.gold,
    fontSize: '14px',
  },
  contactLink: {
    color: colors.white,
    textDecoration: 'none',
  },
}

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div>
        <div style={styles.logo}>{brand.name}</div>
        <div style={styles.tagline}>{brand.tagline}</div>
      </div>
      <div style={styles.contact}>
        <div style={styles.contactItem}>
          <span style={styles.contactIcon}>✆</span>
          <a href={`tel:${brand.phone}`} style={styles.contactLink}>{brand.phone}</a>
        </div>
        <div style={styles.contactItem}>
          <span style={styles.contactIcon}>✉</span>
          <a href={`mailto:${brand.email}`} style={styles.contactLink}>{brand.email}</a>
        </div>
      </div>
    </nav>
  )
}
