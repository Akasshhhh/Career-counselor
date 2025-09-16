import { SVGProps } from "react"

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a6 6 0 0 1-12 0V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10z" />
      <path d="M3 15a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10z" />
    </svg>
  )
}

export const Icons = {
  spinner: Spinner,
  logo: Logo,
}

export default Icons
