import { Button, Logo, Input } from 'components'
import { useState } from 'react'
import { useStore } from 'store/AuthStore'
import { updateLogin, updateUserPassword } from 'services/api'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import style from './ProfileEdit.module.scss'

interface ProfileEditProps {
  variant?: 'login' | 'password' | null
  closeFunc?: () => void
}

export const ProfileEdit: FC<PropsWithChildren & ProfileEditProps> = ({ variant = 'login', closeFunc }) => {
  const [loginValue, setLoginValue] = useState<string | number>('')
  const [passValue, setPassValue] = useState<string | number>('')
  const [repeatValue, setRepeatValue] = useState<string | number>('')

  const user = useStore((store) => store.user)
  const setUser = useStore((store) => store.setUser)

  const saveButtonHandler = async () => {
    if (loginValue && variant === 'login') updateLogin({ email: String(loginValue) })

    if (passValue === repeatValue && variant === 'password') {
      try {
        await updateUserPassword({ password: String(passValue) })
        if (user) setUser({ ...user, password: String(passValue) })
      } catch (error) {
        console.warn(error)
      }
    }
  }

  if (variant === null) return

  return (
    <div className={style.box} onClick={closeFunc}>
      <div onClick={(e: MouseEvent) => e.stopPropagation()} className={style.content}>
        <Logo />

        <div className={style.inputs}>
          {variant === 'login' ? (
            <label className={style.text}>
              Новый логин:
              <Input
                inputType="text"
                value={loginValue}
                placeholderText="Логин"
                onValueChange={(loginValue) => setLoginValue(loginValue)}
              />
            </label>
          ) : (
            <>
              <label className={style.text}>
                Новый пароль:
                <Input
                  inputType="text"
                  value={passValue}
                  placeholderText="Пароль"
                  onValueChange={(passValue) => setPassValue(passValue)}
                />
              </label>

              <label>
                <Input
                  inputType="text"
                  value={repeatValue}
                  placeholderText="Повторите пароль"
                  onValueChange={(repeatValue) => setRepeatValue(repeatValue)}
                />
              </label>
            </>
          )}
        </div>

        <Button onClick={saveButtonHandler} fontSize={18}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
