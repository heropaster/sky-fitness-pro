import styles from './AuthPage.module.scss'
import { Input, Logo, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { createNewUser, loginUser } from 'services/api'
import { validateEmail, validatePassword } from 'helpers/helpersFunction'

export function AuthPage() {
  // юзер: JohnDow@mail.mail пароль: asdfasdf
  const [login, setLogin] = useState('JohnDow@mail.mail')
  const [password, setPassword] = useState('asdfasdf')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  interface login {
    value: string | number
    placeholder: string
  }

  const setUser = useStore((state) => state.setUser)

  // Переключение между логином и регистрацией и сбрасывание ошибки
  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }
  // Функция входа пользователя и валидация
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        setErrorMessage('Все поля должны быть заполнены')
        return
      }
      case !login: {
        setErrorMessage('Введите логин')
        return
      }
      case !password: {
        setErrorMessage('Введите пароль')
        return
      }
      case !validateEmail(login as string): {
        setErrorMessage('Введите корректный email')
        return
      }
      case !validatePassword(password as string): {
        setErrorMessage('Пароль должен содержать от 6 до 64 символов')
        return
      }
      default: {
        try {
          const response = await loginUser({ email: login as string, password: password as string })

          setUser(response)
          navigate('/profile')
          return response
        } catch (error) {
          if (error instanceof Error) setErrorMessage(error.message)
        }
      }
    }
  }

  // Функция регистрации пользователя и валидация
  const handleRegistration = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        setErrorMessage('Все поля должны быть заполнены')
        break
      }
      case !login: {
        setErrorMessage('Введите логин')
        break
      }
      case !password: {
        setErrorMessage('Введите пароль')
        break
      }
      case password !== repeatPassword: {
        setErrorMessage('пароли должны совпадать!')
        break
      }
      case !validateEmail(login as string): {
        setErrorMessage('Введите корректный email')
        return
      }
      case !validatePassword(password as string): {
        setErrorMessage('Пароль должен содержать от 6 до 64 символов')
        return
      }
      default: {
        try {
          const response = await createNewUser({ email: login as string, password: password as string })
          console.log(response, 'Это ответ на логин')

          setUser(response)
          navigate('/profile')
          return response
        } catch (error) {
          if (error instanceof Error) setErrorMessage(error.message)
        }
      }
    }
  }
  // Сбрасывает ошибку при вводе в инпут и при переключении на регистрацию
  useEffect(() => {
    setErrorMessage('')
  }, [login, password, repeatPassword, isLoginMode])

  return (
    <form className={styles.wrapper}>
      <div className={styles.AuthForm}>
        <Logo />
        {isLoginMode ? (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login) => {
                  setLogin(login as string)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(value) => {
                  setPassword(value as string)
                }}
              />
            </div>

            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleLogin}>
                Войти
              </Button>
              <Button fontSize={18} onClick={handleIsLoginMode} variant="transparent">
                Зарегистрироваться
              </Button>
            </div>
            {errorMessage && <div className={styles.errorInput}>{errorMessage}</div>}
          </>
        ) : (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login) => {
                  setLogin(login as string)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(value) => {
                  setPassword(value as string)
                }}
              />
              <Input
                inputType={'password'}
                value={repeatPassword}
                placeholderText={'Повторите пароль'}
                onValueChange={(value) => {
                  setRepeatPassword(value as string)
                }}
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleRegistration}>
                Зарегистрироваться
              </Button>
            </div>
            {errorMessage && <div className={styles.errorInput}>{errorMessage}</div>}
          </>
        )}
      </div>
    </form>
  )
}
