// Format text with a capital letter
export function capitalize (text) {
  if (text.includes('alpine')) {
    return 'Alpine Linux'
  } else if (text === 'mac') {
    return 'macOS'
  } else {
    return text[0].toUpperCase() + text.slice(1)
  }
}
