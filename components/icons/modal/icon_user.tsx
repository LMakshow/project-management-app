import { TChildComponentProps } from '../../Modal-window/type-modal-window'

export const User = ({
  fill,
  size,
  height,
  width,
  ...props
}: TChildComponentProps) => {
  return (
    <svg
      id='Iconly_Curved_Profile'
      data-name='Iconly/Curved/Profile'
      xmlns='http://www.w3.org/2000/svg'
      width={size || width || 24}
      height={size || height || 24}
      viewBox='0 0 24 24'
      {...props}>
      <g id='Profile' transform='translate(5 2.4)'>
        <path
          d='M6.845,7.3C3.153,7.3,0,6.726,0,4.425S3.133,0,6.845,0c3.692,0,6.845,2.1,6.845,4.4S10.556,7.3,6.845,7.3Z'
          transform='translate(0 11.962)'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth={1.5}
        />
        <path
          d='M4.387,8.774a4.372,4.372,0,1,0-.031,0Z'
          transform='translate(2.45 0)'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth={1.5}
        />
      </g>
    </svg>
  )
}
