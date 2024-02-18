import styles from './auth.module.scss'
import { Input } from 'components/UI/Input/Input'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from 'components/UI/Button/Button'
// import { Logo } from 'components/UI/Logo/Logo'

export function AuthPage() {
  const [login, setLogin] = useState<string | number>('')
  const [password, setPassword] = useState<string | number>('')
  const [repeatPassword, setRepeatPassword] = useState<string | number>('')

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)

  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.AuthForm}>
        <Link to="/">Здесь будет лого</Link>
        {isLoginMode ? (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login: string | number) => {
                  setLogin(login)
                  console.log(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password: string | number) => {
                  setPassword(password)
                  console.log(password)
                }}
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button>Войти</Button>
              <Button onClick={handleIsLoginMode} variant="transparent">
                Зарегистрироваться
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login: string | number) => {
                  setLogin(login)
                  console.log(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password: string | number) => {
                  setPassword(password)
                  console.log(password)
                }}
              />
              <Input
                inputType={'password'}
                value={repeatPassword}
                placeholderText={'Повторите пароль'}
                onValueChange={(repeatPassword: string | number) => {
                  setRepeatPassword(repeatPassword)
                  console.log(repeatPassword)
                }}
              />
            </div>
            <Button>Войти</Button>
          </>
        )}
      </div>
    </div>
  )
}