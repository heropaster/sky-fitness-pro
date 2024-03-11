import { Input, Logo, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { createNewUser, loginUser } from 'services/api'
import { validateInput } from 'helpers/helpersFunction'
import styles from './AuthPage.module.scss'

export function AuthPage() {
  // юзер: JohnDow@mail.mail пароль: asdfasdf
  const [login, setLogin] = useState('JohnDow@mail.mail')
  const [password, setPassword] = useState('asdfasdf')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const setUser = useStore((state) => state.setUser)

  // Переключение между логином и регистрацией и сбрасывание ошибки
  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }

  // Функция входа пользователя и валидация
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errorMessage = validateInput(login as string, password as string, true)

    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }

    try {
      const response = await loginUser({ email: login as string, password: password as string })
      setUser(response)
      navigate('/profile')
      return response
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
    }
  }

  // Функция регистрации пользователя и валидация
  const handleRegistration = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errorMessage = validateInput(login as string, password as string, false, repeatPassword as string)

    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }

    try {
      const response = await createNewUser({ email: login as string, password: password as string })
      setUser(response)
      navigate('/profile')
      return response
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
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
