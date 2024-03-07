import { Button } from 'components'
import { useStore } from 'store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from 'services/api'
import type { FC } from 'react'
import style from './UserGroup.module.scss'

interface UserGroupProps {
  color: 'black' | 'white'
  login: string | null
}

export const UserGroup: FC<UserGroupProps> = ({ login, color }) => {
  const setUser = useStore((store) => store.setUser)
  const history = useNavigate()

  const goToProfile = () => {
    history('/profile')
  }

  return (
    <div className={style.box}>
      <div className={style.avatar} onClick={goToProfile} />
      <span className={`${style.name} ${style[color]}`} onClick={goToProfile}>
        {login}
      </span>
      <label className={style.label}>
        <input className={style.checkbox} type="checkbox" />
        <svg
          style={{ stroke: color }}
          className={style.checkbox__svg}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.3552 1.03308L6.67761 6.7107L0.999999 1.03308" strokeWidth="2" />
        </svg>
        <div className={style.menu}>
          <Button
            onClick={async () => {
              await logoutUser()
              setUser(null)
            }}
            variant="green"
            width={100}
          >
            Выйти
          </Button>
        </div>
      </label>
    </div>
  )
}
