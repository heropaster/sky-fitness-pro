import { useState } from 'react'
import { Button, Logo, Input } from 'components'
import { updateLogin, updateUserPassword } from 'services/api'
import { useStore } from 'store/AuthStore'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import style from './YesNoPopUp.module.scss'

interface YesNoPopUpProps {
  variant?: 'delete' | 'add' | null
  course: string
  closeFunc?: () => void
  agreeFunc?: () => void
}

export const YesNoPopUp: FC<PropsWithChildren & YesNoPopUpProps> = ({ variant = 'add', closeFunc, course, agreeFunc }) => {
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

        <p>Добавить курс {course} в ваш профиль?</p>

        <Button width={100} fontSize={18}>
          Да
        </Button>
      </div>
      <Button width={100} variant='red' fontSize={18}>
          Нет
        </Button>
    </div>
  )
}
