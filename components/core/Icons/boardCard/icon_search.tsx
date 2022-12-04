export const IconSearch = ({
  fill = 'currentColor',
  size,
  height,
  width,
}: {
  fill?: string
  size?: number
  height?: number
  width?: number
}) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={size || width || 24}
    height={size || height || 24}
    viewBox='0 0 24 24'
    fill='none'>
    <circle
      cx='11.7666'
      cy='11.7666'
      r='8.98856'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18.0183 18.4851L21.5423 22'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
