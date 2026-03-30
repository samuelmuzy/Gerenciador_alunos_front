interface WizardStepProps {
    index: number
    label: string
    total: number
    current: number
  }
  
  export function WizardStep({ index, label, total, current }: WizardStepProps) {
    const isDone = index < current
    const isActive = index === current
  
    return (
      <div className="flex flex-1 items-center">
        <div className="flex items-center gap-2.5">
          {/* Circle */}
          <div
            className={[
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
              isDone
                ? 'bg-indigo-600 text-white'
                : isActive
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                : 'bg-slate-100 text-slate-400',
            ].join(' ')}
          >
            {isDone ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          {/* Label */}
          <span
            className={[
              'text-sm font-medium',
              isActive ? 'text-indigo-600' : isDone ? 'text-slate-700' : 'text-slate-400',
            ].join(' ')}
          >
            {label}
          </span>
        </div>
  
        {/* Connector line */}
        {index < total - 1 && (
          <div className="mx-4 h-px flex-1 bg-slate-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: isDone ? '100%' : '0%' }}
            />
          </div>
        )}
      </div>
    )
  }