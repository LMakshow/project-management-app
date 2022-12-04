export const validateEmail = (value: string) => {
  return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
}

export const validatePassword = (value: string) => {
  return value.length >= 6
}
