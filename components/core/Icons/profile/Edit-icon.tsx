import { TChildComponentProps } from '../../Modal/type-modal-window'

export const EditIcon = ({
  fill = 'currentColor',
  size,
  height,
  width,
  ...props
}: TChildComponentProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 39 39'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M34.2083 13.5937L25.3542 4.84374L28.2708 1.92707C29.0694 1.12846 30.0507 0.729156 31.2146 0.729156C32.3771 0.729156 33.3576 1.12846 34.1562 1.92707L37.0729 4.84374C37.8715 5.64235 38.2882 6.60624 38.3229 7.73541C38.3576 8.86318 37.9757 9.82638 37.1771 10.625L34.2083 13.5937ZM31.1875 16.6667L9.10417 38.75H0.25V29.8958L22.3333 7.81249L31.1875 16.6667Z'
        fill='#043B7C'
      />
    </svg>
  )
}
