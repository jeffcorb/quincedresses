import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { theme } from '../theme'
import { supabase } from '../lib/supabase'

const { colors, fonts, stores, timeSlots, brand } = theme

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateShort(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function inputStyle(focused) {
  return {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: fonts.body,
    border: `1px solid ${focused ? colors.gold : colors.border}`,
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: colors.white,
    color: colors.black,
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }
}

function LookupSection({ onResults }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)

  async function handleLookup() {
    if (!phone.trim()) return
    setLoading(true)
    setError('')
    setResults(null)
    try {
      const { data, error: err } = await supabase
        .from('appointments')
        .select('*')
        .eq('phone', phone.trim())
        .order('date', { ascending: false })
      if (err) throw err
      setResults(data || [])
      onResults(data || [])
    } catch (e) {
      setError('Unable to look up appointments. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '32px',
    }}>
      <h3 style={{
        fontFamily: fonts.heading,
        fontSize: '18px',
        fontWeight: 'normal',
        color: colors.black,
        marginBottom: '14px',
      }}>
        Find My Appointments
      </h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLookup()}
          style={{ ...inputStyle(false), maxWidth: '280px' }}
        />
        <button
          onClick={handleLookup}
          disabled={loading}
          style={{
            fontFamily: fonts.body,
            backgroundColor: colors.gold,
            color: colors.black,
            border: 'none',
            borderRadius: '4px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Searching…' : 'Find My Visits'}
        </button>
      </div>

      {error && (
        <p style={{ fontFamily: fonts.body, color: '#c0392b', fontSize: '13px', marginTop: '10px' }}>{error}</p>
      )}

      {results !== null && (
        <div style={{ marginTop: '20px' }}>
          {results.length === 0 ? (
            <p style={{ fontFamily: fonts.body, color: colors.textMuted, fontSize: '14px' }}>
              No appointments found for that phone number.
            </p>
          ) : (
            <div>
              <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textMuted, marginBottom: '12px' }}>
                {results.length} appointment{results.length !== 1 ? 's' : ''} found:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {results.map(apt => {
                  const store = stores.find(s => s.id === Number(apt.store_id))
                  const isUpcoming = new Date(apt.date) >= new Date()
                  return (
                    <div key={apt.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 16px',
                      backgroundColor: colors.gray,
                      borderRadius: '6px',
                      borderLeft: `3px solid ${isUpcoming ? colors.gold : colors.border}`,
                      flexWrap: 'wrap',
                    }}>
                      <span style={{
                        fontFamily: fonts.body,
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        backgroundColor: isUpcoming ? colors.goldLight : colors.border,
                        color: isUpcoming ? colors.goldDark : colors.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                      <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.black }}>
                        {store ? store.state : `Store #${apt.store_id}`}
                      </span>
                      <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textMuted }}>
                        {apt.date} at {apt.time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Confirmation({ name, store, date, time, onReset }) {
  const storeObj = stores.find(s => s.id === Number(store))
  return (
    <div style={{
      backgroundColor: colors.white,
      border: `2px solid ${colors.gold}`,
      borderRadius: '8px',
      padding: '48px 32px',
      textAlign: 'center',
      maxWidth: '560px',
      margin: '40px auto',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.goldLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '28px',
      }}>
        ✓
      </div>
      <h2 style={{
        fontFamily: fonts.heading,
        fontSize: '26px',
        fontWeight: 'normal',
        color: colors.black,
        marginBottom: '12px',
      }}>
        Appointment Confirmed!
      </h2>
      <p style={{
        fontFamily: fonts.body,
        color: colors.textMuted,
        fontSize: '15px',
        lineHeight: '1.7',
        marginBottom: '24px',
      }}>
        Thank you, <strong style={{ color: colors.black }}>{name}</strong>.<br />
        We look forward to seeing you at our{' '}
        <strong style={{ color: colors.goldDark }}>{storeObj ? storeObj.state : 'store'}</strong> location
        on <strong style={{ color: colors.black }}>{formatDate(date)}</strong> at{' '}
        <strong style={{ color: colors.black }}>{time}</strong>.
      </p>
      <p style={{
        fontFamily: fonts.body,
        color: colors.textMuted,
        fontSize: '14px',
        marginBottom: '28px',
      }}>
        Questions? Call us at <a href={`tel:${brand.phone}`} style={{ color: colors.goldDark }}>{brand.phone}</a>
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: fonts.body,
          backgroundColor: colors.black,
          color: colors.gold,
          border: 'none',
          borderRadius: '4px',
          padding: '12px 28px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        Book Another Appointment
      </button>
    </div>
  )
}

export default function Appointments({ preselectedStoreId }) {
  const [lookupResults, setLookupResults] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmData, setConfirmData] = useState(null)

  // Form state
  const [storeId, setStoreId] = useState(preselectedStoreId || '')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [focusedField, setFocusedField] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Update store if preselected changes (navigating from Stores tab)
  useEffect(() => {
    if (preselectedStoreId) setStoreId(preselectedStoreId)
  }, [preselectedStoreId])

  const selectedStore = stores.find(s => s.id === Number(storeId))
  const isFormReady = storeId && date && time && name.trim() && phone.trim()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFormReady) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const dateStr = date.toISOString().split('T')[0]
      const { error } = await supabase.from('appointments').insert([{
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        store_id: Number(storeId),
        date: dateStr,
        time,
        notes: notes.trim() || null,
      }])
      if (error) throw error
      setConfirmData({ name, store: storeId, date, time })
      setConfirmed(true)
    } catch (e) {
      setSubmitError('Unable to save appointment. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleReset() {
    setConfirmed(false)
    setConfirmData(null)
    setStoreId('')
    setDate(null)
    setTime('')
    setName('')
    setPhone('')
    setEmail('')
    setNotes('')
  }

  if (confirmed && confirmData) {
    return (
      <div style={{ backgroundColor: colors.cream, minHeight: '100%', padding: '40px 24px' }}>
        <Confirmation {...confirmData} onReset={handleReset} />
      </div>
    )
  }

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
          Book an Appointment
        </h2>
        <p style={{
          fontFamily: fonts.body,
          color: colors.textMuted,
          fontSize: '15px',
        }}>
          Schedule your personal gown fitting at any of our four boutiques
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Phone Lookup */}
        <LookupSection onResults={setLookupResults} />

        {/* Booking form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* Left column: store + calendar + time */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Store selector */}
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
              }}>
                <label style={{
                  display: 'block',
                  fontFamily: fonts.body,
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: colors.textMuted,
                  marginBottom: '10px',
                }}>
                  Select Location *
                </label>
                <select
                  value={storeId}
                  onChange={e => setStoreId(e.target.value)}
                  style={{
                    ...inputStyle(focusedField === 'store'),
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23777' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px',
                  }}
                  onFocus={() => setFocusedField('store')}
                  onBlur={() => setFocusedField('')}
                >
                  <option value="">Choose a store…</option>
                  {stores.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.state} — {s.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calendar */}
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
              }}>
                <label style={{
                  display: 'block',
                  fontFamily: fonts.body,
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: colors.textMuted,
                  marginBottom: '16px',
                }}>
                  Select Date *
                </label>
                <style>{`
                  .react-calendar {
                    border: none !important;
                    width: 100% !important;
                    font-family: ${fonts.body} !important;
                  }
                  .react-calendar__tile--active {
                    background: ${colors.gold} !important;
                    color: ${colors.black} !important;
                    border-radius: 4px !important;
                  }
                  .react-calendar__tile--active:enabled:hover,
                  .react-calendar__tile--active:enabled:focus {
                    background: ${colors.goldDark} !important;
                  }
                  .react-calendar__tile:enabled:hover {
                    background: ${colors.goldLight} !important;
                    border-radius: 4px !important;
                  }
                  .react-calendar__navigation button:enabled:hover {
                    background: ${colors.gray} !important;
                  }
                  .react-calendar__month-view__days__day--weekend {
                    color: ${colors.goldDark} !important;
                  }
                `}</style>
                <Calendar
                  onChange={setDate}
                  value={date}
                  minDate={new Date()}
                  locale="en-US"
                />
              </div>

              {/* Time slots */}
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
              }}>
                <label style={{
                  display: 'block',
                  fontFamily: fonts.body,
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: colors.textMuted,
                  marginBottom: '14px',
                }}>
                  Select Time *
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                }}>
                  {timeSlots.map(slot => {
                    const isSelected = time === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        style={{
                          fontFamily: fonts.body,
                          fontSize: '13px',
                          fontWeight: isSelected ? '600' : '400',
                          padding: '10px 6px',
                          borderRadius: '4px',
                          border: `1px solid ${isSelected ? colors.gold : colors.border}`,
                          backgroundColor: isSelected ? colors.gold : colors.white,
                          color: isSelected ? colors.black : colors.textMuted,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) {
                            e.target.style.borderColor = colors.gold
                            e.target.style.color = colors.goldDark
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) {
                            e.target.style.borderColor = colors.border
                            e.target.style.color = colors.textMuted
                          }
                        }}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right column: personal info + summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Personal info */}
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontFamily: fonts.heading,
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: colors.black,
                  marginBottom: '20px',
                }}>
                  Your Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                      style={inputStyle(focusedField === 'name')}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      required
                      style={inputStyle(focusedField === 'phone')}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address <span style={{ color: colors.textMuted, fontWeight: '400' }}>(optional)</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={inputStyle(focusedField === 'email')}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Notes <span style={{ color: colors.textMuted, fontWeight: '400' }}>(optional)</span></label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Dress preferences, colors, budget range…"
                      rows={3}
                      style={{
                        ...inputStyle(focusedField === 'notes'),
                        resize: 'vertical',
                        minHeight: '80px',
                      }}
                      onFocus={() => setFocusedField('notes')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                </div>
              </div>

              {/* Live summary */}
              <div style={{
                backgroundColor: colors.black,
                borderRadius: '8px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontFamily: fonts.heading,
                  fontSize: '16px',
                  fontWeight: 'normal',
                  color: colors.gold,
                  marginBottom: '18px',
                  letterSpacing: '0.5px',
                }}>
                  Appointment Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <SummaryRow label="Name" value={name || '—'} />
                  <SummaryRow label="Phone" value={phone || '—'} />
                  <SummaryRow
                    label="Location"
                    value={selectedStore ? `${selectedStore.state}` : '—'}
                  />
                  <SummaryRow label="Date" value={date ? formatDateShort(date) : '—'} />
                  <SummaryRow label="Time" value={time || '—'} />

                  <div style={{
                    borderTop: `1px solid rgba(201,168,76,0.25)`,
                    marginTop: '4px',
                    paddingTop: '16px',
                  }}>
                    {submitError && (
                      <p style={{
                        fontFamily: fonts.body,
                        color: '#e87777',
                        fontSize: '13px',
                        marginBottom: '12px',
                      }}>
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={!isFormReady || submitting}
                      style={{
                        width: '100%',
                        fontFamily: fonts.body,
                        backgroundColor: isFormReady ? colors.gold : 'rgba(201,168,76,0.3)',
                        color: isFormReady ? colors.black : 'rgba(255,255,255,0.4)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: isFormReady && !submitting ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {submitting ? 'Booking…' : 'Confirm Appointment'}
                    </button>
                    {!isFormReady && (
                      <p style={{
                        fontFamily: fonts.body,
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.35)',
                        textAlign: 'center',
                        marginTop: '10px',
                      }}>
                        Please fill in all required fields
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontFamily: theme.fonts.body,
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  color: theme.colors.textMuted,
  marginBottom: '6px',
}

function SummaryRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
      <span style={{
        fontFamily: fonts.body,
        fontSize: '12px',
        color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: fonts.body,
        fontSize: '14px',
        color: value === '—' ? 'rgba(255,255,255,0.25)' : colors.white,
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}
