import { useState } from 'react'
import { Button, Logo, Input } from 'components'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import style from './ProfileEdit.module.scss'

interface ProfileEditProps {
  variant?: 'login' | 'password'
  closeFunc?: () => void
}

export const ProfileEdit: FC<PropsWithChildren & ProfileEditProps> = ({ variant = 'login', closeFunc }) => {
  const [loginValue, setLoginValue] = useState<string | number>('')
  const [passValue, setPassValue] = useState<string | number>('')
  const [repeatValue, setRepeatValue] = useState<string | number>('')

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

        <Button fontSize={18}>Сохранить</Button>
      </div>
    </div>
  )
}