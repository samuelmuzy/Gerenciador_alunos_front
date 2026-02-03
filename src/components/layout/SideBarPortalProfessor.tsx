'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    href: '/portal-professor',
    label: 'Início',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6H2a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: '/portal-professor/alunos',
    label: 'Alunos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
      </svg>
    ),
  },
  {
    href: '/portal-professor/turmas',
    label: 'Turmas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a1.5 1.5 0 0 0-.878-1.303l-2.25-1A1.5 1.5 0 0 0 13.5 2.25v1.309a7.5 7.5 0 0 0-2.75 13.261Z" />
        <path d="M1.5 4.25a1.5 1.5 0 0 1 1-1.414l2.25-1a1.5 1.5 0 0 1 1.5 0l2.25 1A1.5 1.5 0 0 1 8.5 4.25v1.309a7.5 7.5 0 0 0 3.5 5.622v9.94a.75.75 0 0 1-1.086.67A7.462 7.462 0 0 1 5 15.5a7.462 7.462 0 0 1-2.914-.559A.75.75 0 0 1 1 14.19V4.25Z" />
      </svg>
    ),
  },
  {
    href: '/portal-professor/periodos',
    label: 'Períodos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: '/portal-professor/avaliacoes',
    label: 'Avaliações',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v.258a33.186 33.186 0 0 1 6.668.83.75.75 0 0 1-.336 1.461 31.28 31.28 0 0 0-1.103-.232l1.702 7.545a.75.75 0 0 1-.387.832A4.981 4.981 0 0 1 15 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 0 1-.387-.832l1.77-7.849a31.743 31.743 0 0 0-3.339-.254v11.505a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 10 2ZM5 14a4 4 0 0 1 4-4c.825 0 1.606.2 2.294.556a.75.75 0 0 1 .387.832l-1.77 7.849a31.743 31.743 0 0 0 3.339.254v-11.505a.75.75 0 0 1 1.5 0v11.506a33.186 33.186 0 0 1-6.668-.83.75.75 0 0 1 .336-1.461 31.28 31.28 0 0 0 1.103.232l-1.702-7.545a.75.75 0 0 1 .387-.832A4.981 4.981 0 0 1 5 14Z" clipRule="evenodd" />
      </svg>
    ),
  },
]

export function SideBarPortalProfessor() {
  const pathname = usePathname()

  return (
    <aside className="flex h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span
                className={isActive ? 'text-indigo-600' : 'text-slate-400'}
                aria-hidden
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
