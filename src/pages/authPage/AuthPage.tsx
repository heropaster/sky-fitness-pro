import styles from './AuthPage.module.scss'
import { Input, Logo, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { fetchLogin } from 'services/api'

export function AuthPage() {
  // юзер: JohnDow пароль: asdf
  const [login, setLogin] = useState<string | number>('JohnDow')
  const [password, setPassword] = useState<string | number>('asdf')
  const [repeatPassword, setRepeatPassword] = useState<string | number>('')
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const setUser = useStore((state) => state.setUser)

  // Переклчение между логином и регистрацией и сбрасывание ошибки
  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }

  // Функция входа пользователя и валидация
  const handleLogin = (e: { preventDefault: () => void }) => {
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
      default: {
        fetchLogin({ login, password })
          .then((response) => {
            setUser(response)
            navigate('/profile')
            return response
          })
          .catch((error) => setErrorMessage(error.message))
      }
    }
  }

  // Функция регистрации пользователя и валидация
  const handleRegistration = (e: { preventDefault: () => void }) => {
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
      default: {
        navigate('/profile')
      }
    }
  }
  // Сбрасывает ошибку при вводе в инпут и при переключении на регистрацию
  useEffect(() => {
    setErrorMessage('')
  }, [login, password, repeatPassword, isLoginMode])

  return (
    <div className={styles.wrapper}>
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
                  setLogin(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password) => {
                  setPassword(password)
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
                  setLogin(login)
                  console.log(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password) => {
                  setPassword(password)
                }}
              />
              <Input
                inputType={'password'}
                value={repeatPassword}
                placeholderText={'Повторите пароль'}
                onValueChange={(repeatPassword) => {
                  setRepeatPassword(repeatPassword)
                }}
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleRegistration}>
                Войти
              </Button>
            </div>
            {errorMessage && <div className={styles.errorInput}>{errorMessage}</div>}
          </>
        )}
      </div>
    </div>
  )
}
