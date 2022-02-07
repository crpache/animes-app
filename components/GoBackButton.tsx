import { ChevronLeftIcon as ChevronLeft } from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  href: string
  label: string
}

export const GoBackButton = ({ href, label }: Props) => (
  <Link href={href}>
    <span className="flex cursor-pointer">
      <ChevronLeft className="h-6 w-6 mr-1 text-slate-200" />
      {label && <span>{label}</span>}
    </span>
  </Link>
)
