export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type Color = 'default' | 'success' | 'warning' | 'error'

export interface BaseProps {
  id?: string
  className?: string
  disabled?: boolean
}

export interface ComponentConfig {
  size?: Size
  variant?: Variant
  color?: Color
}