import type { FC, PropsWithChildren } from 'react'

interface TitleProps {
  color?: string
}

export const Title: FC<PropsWithChildren & TitleProps> = ({ children, color }) => (
  <h1 style={{ color: color }}>{children}</h1>
)