export const IconBack = ({
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
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2.75021C6.892 2.75021 2.75 6.89121 2.75 12.0002C2.75 17.1082 6.892 21.2502 12 21.2502C17.108 21.2502 21.25 17.1082 21.25 12.0002C21.25 6.89121 17.108 2.75021 12 2.75021Z'
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d="M13.4423 8.52902L9.95626 12L13.4423 15.471"
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
