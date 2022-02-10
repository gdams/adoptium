// Format text with a capital letter
export function capitalize (text) {
  if (text === 'alpine-linux') {
    return 'Alpine Linux'
  } else if (text === 'mac') {
    return 'MacOS'
  } else {
    return text[0].toUpperCase() + text.slice(1)
  }
}
