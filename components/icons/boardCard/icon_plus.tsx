export const IconPlus = ({
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
    fill="none">
    <path
      d='M12 8.3273V15.6537'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15.6667 11.9905H8.33333'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
