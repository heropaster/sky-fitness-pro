export const validatePassword = (password: string): boolean => password.length >= 6 && password.length <= 64

export const validateEmail = (login: string): boolean => {
  const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[a-z]{2,}$/
  return login.length >= 6 && login.length <= 64 && emailRegex.test(login)
}
