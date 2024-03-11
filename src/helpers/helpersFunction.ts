export const validatePassword = (password: string): boolean => password.length >= 6 && password.length <= 64

export const validateEmail = (login: string): boolean => {
  const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[a-z]{2,}$/
  return login.length >= 6 && login.length <= 64 && emailRegex.test(login)
}

export const validateInput = (login: string, password: string, isLoginMode: boolean, repeatPassword?: string) => {
  switch (true) {
    case !login && !password: {
      return 'Все поля должны быть заполнены'
    }
    case !login: {
      return 'Введите логин'
    }
    case !password: {
      return 'Введите пароль'
    }
    case !validateEmail(login): {
      return 'Введите корректный email'
    }
    case !validatePassword(password): {
      return 'Пароль должен содержать от 6 до 64 символов'
    }
    case !isLoginMode && password !== repeatPassword: {
      return 'Пароли должны совпадать!'
    }
    default: {
      return null
    }
  }
}
