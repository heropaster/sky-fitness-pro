import { RotatingLines } from 'react-loader-spinner'
import style from './LoaderSpinner.module.scss'

export const LoaderSpinner = () => (
  <div className={style.wrapper}>
    <RotatingLines
      visible={true}
      width="196"
      strokeWidth="4"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  </div>
)
