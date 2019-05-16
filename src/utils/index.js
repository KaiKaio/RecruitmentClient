export function getRedirectTo(type, avatar) {
  let path = ''
  if(type === 'company') {
    path = '/company'
  } else {
    path = '/personnel'
  }
  if(!avatar) {
    path += 'info'
  }
  return path
}