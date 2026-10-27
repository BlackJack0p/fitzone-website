/**
 * FitZone formatting utilities.
 * Reusable functions for displaying data consistently.
 */

const SOUTH_AFRICAN_LOCALE = 'en-ZA'
const SOUTH_AFRICAN_CURRENCY = 'ZAR'

/**
 * Formats a price in South African rand.
 *
 * Examples:
 * 299      -> R299,00
 * 299.5    -> R299,50
 * 1500     -> R1 500,00
 *
 * Invalid or negative prices return "Price unavailable".
 */
export function formatPrice(price) {
  if (
    price === null ||
    price === undefined ||
    (typeof price === 'string' && price.trim() === '')
  ) {
    return 'Price unavailable'
  }

  const amount = Number(price)

  if (!Number.isFinite(amount) || amount < 0) {
    return 'Price unavailable'
  }

  return new Intl.NumberFormat(SOUTH_AFRICAN_LOCALE, {
    style: 'currency',
    currency: SOUTH_AFRICAN_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formats a number using South African number conventions.
 *
 * Examples:
 * 1500    -> 1 500
 * 1500.5  -> 1 500,5
 *
 * @param {number|string} value
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
export function formatNumber(value, maximumFractionDigits = 0) {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return ''
  }

  const number = Number(value)

  if (
    !Number.isFinite(number) ||
    !Number.isInteger(maximumFractionDigits) ||
    maximumFractionDigits < 0 ||
    maximumFractionDigits > 20
  ) {
    return ''
  }

  return new Intl.NumberFormat(SOUTH_AFRICAN_LOCALE, {
    maximumFractionDigits,
  }).format(number)
}

/**
 * Formats a date for display.
 *
 * Example:
 * 2026-10-27 -> 27 Oct 2026
 *
 * Custom Intl.DateTimeFormat options can be supplied.
 *
 * @param {Date|string|number} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (
    date === null ||
    date === undefined ||
    date === ''
  ) {
    return ''
  }

  const parsedDate = date instanceof Date
    ? date
    : new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  try {
    return new Intl.DateTimeFormat(SOUTH_AFRICAN_LOCALE, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...options,
    }).format(parsedDate)
  } catch {
    return ''
  }
}

/**
 * Formats a time for display using the 24-hour clock.
 *
 * Accepts a Date object or a time string such as "07:00".
 *
 * Examples:
 * 7:00    -> 07:00
 * 14:30   -> 14:30
 * 07:00:00 -> 07:00
 *
 * @param {Date|string} time
 * @returns {string}
 */
export function formatTime(time) {
  if (time instanceof Date) {
    if (Number.isNaN(time.getTime())) {
      return ''
    }

    return new Intl.DateTimeFormat(SOUTH_AFRICAN_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(time)
  }

  if (typeof time !== 'string' || !time.trim()) {
    return ''
  }

  const match = time.trim().match(
    /^([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/
  )

  if (!match) {
    return ''
  }

  return `${match[1].padStart(2, '0')}:${match[2]}`
}

/**
 * Combines a class start time and end time.
 *
 * Example:
 * 07:00 and 08:00 -> 07:00–08:00
 *
 * @param {string|Date} startTime
 * @param {string|Date} endTime
 * @returns {string}
 */
export function formatTimeRange(startTime, endTime) {
  const start = formatTime(startTime)
  const end = formatTime(endTime)

  if (!start || !end) {
    return ''
  }

  return `${start}–${end}`
}

/**
 * Formats a duration in minutes.
 *
 * Examples:
 * 30  -> 30 minutes
 * 60  -> 1 hour
 * 90  -> 1 hour 30 minutes
 * 120 -> 2 hours
 *
 * @param {number|string} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (
    minutes === null ||
    minutes === undefined ||
    (typeof minutes === 'string' && minutes.trim() === '')
  ) {
    return ''
  }

  const duration = Number(minutes)

  if (!Number.isFinite(duration) || duration < 0) {
    return ''
  }

  const totalMinutes = Math.floor(duration)
  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  const hourText = hours > 0
    ? `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    : ''

  const minuteText = remainingMinutes > 0
    ? `${remainingMinutes} ${
        remainingMinutes === 1 ? 'minute' : 'minutes'
      }`
    : ''

  return [hourText, minuteText].filter(Boolean).join(' ') ||
    '0 minutes'
}

/**
 * Capitalises the first letter of a string.
 *
 * Example:
 * "strength training" -> "Strength training"
 *
 * @param {string} value
 * @returns {string}
 */
export function capitalizeFirst(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return ''
  }

  const text = value.trim()

  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Converts a string to title case.
 *
 * Example:
 * "personal training" -> "Personal Training"
 *
 * @param {string} value
 * @returns {string}
 */
export function toTitleCase(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return ''
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

/**
 * Truncates text to a maximum length.
 *
 * Example:
 * truncateText("A long description", 10) -> "A long..."
 *
 * @param {string} value
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(value, maxLength = 100) {
  if (typeof value !== 'string') {
    return ''
  }

  if (!Number.isInteger(maxLength) || maxLength < 1) {
    return ''
  }

  const text = value.trim()

  if (text.length <= maxLength) {
    return text
  }

  if (maxLength <= 3) {
    return '.'.repeat(maxLength)
  }

  return `${text.slice(0, maxLength - 3).trimEnd()}...`
}

/**
 * Formats a person's name by removing unnecessary spaces.
 *
 * @param {string} value
 * @returns {string}
 */
export function formatName(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ')
}

/**
 * Formats a phone number for display.
 *
 * Removes spaces and common punctuation while preserving digits
 * and an optional leading plus sign. This is not phone validation.
 *
 * Examples:
 * "+27 82 123 4567" -> "+27821234567"
 * "082-123-4567"   -> "0821234567"
 *
 * @param {string} value
 * @returns {string}
 */
export function formatPhoneNumber(value) {
  if (typeof value !== 'string') {
    return ''
  }

  const cleaned = value.trim().replace(/[^\d+]/g, '')

  if (!cleaned) {
    return ''
  }

  // Only allow a plus sign at the beginning.
  return cleaned.startsWith('+')
    ? `+${cleaned.slice(1).replace(/\+/g, '')}`
    : cleaned.replace(/\+/g, '')
}
