import { useEffect, useState } from 'react'
import { formatTime, formatName } from '../lib/format'

export function ClassSchedule() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('/api/classes')

        if (!response.ok) {
          throw new Error('Failed to load the class schedule.')
        }

        const data = await response.json()
        const classList = Array.isArray(data) ? data : data.classes

        if (!Array.isArray(classList)) {
          throw new Error('The class data has an unexpected format.')
        }

        setClasses(classList)
      } catch (err) {
        setError(err.message || 'Unable to load the class schedule.')
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  function getClassTime(fitnessClass) {
    const rawTime = fitnessClass.time
      ? fitnessClass.time
      : fitnessClass.startTime && fitnessClass.endTime
        ? `${fitnessClass.startTime} – ${fitnessClass.endTime}`
        : ''

    if (!rawTime) {
      return 'To be confirmed'
    }

    return rawTime
      .split(/\s*[–-]\s*/)
      .map((part) => formatTime(part) || part)
      .join(' – ')
  }

  function getTrainerName(fitnessClass) {
    const name =
      typeof fitnessClass.trainer === 'string'
        ? fitnessClass.trainer
        : fitnessClass.trainer?.name ||
          fitnessClass.trainerName ||
          ''

    return formatName(name) || 'To be confirmed'
  }

  function getClassKey(fitnessClass, index) {
    return (
      fitnessClass.id ??
      `${fitnessClass.name}-${fitnessClass.day}-${index}`
    )
  }

  return (
    <section
      id="class-schedule"
      className="border-t border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">
          FIND YOUR SESSION
        </p>

        <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">
          Our Class <span className="text-primary">Schedule.</span>
        </h2>

        <p className="mx-auto mb-10 max-w-[650px] leading-8 text-text-muted">
          Find a class that fits your routine and take the next step towards
          your fitness goals.
        </p>

        {/* Loading state */}
        {loading && (
          <p className="py-8 text-center text-text-muted" role="status">
            Loading class schedule...
          </p>
        )}

        {/* Error state */}
        {!loading && error && (
          <p className="py-8 text-center text-red-400" role="alert">
            {error}
          </p>
        )}

        {/* Empty state */}
        {!loading && !error && classes.length === 0 && (
          <p className="py-8 text-center text-text-muted">
            No classes are currently scheduled.
          </p>
        )}

        {/* Schedule layouts appear when backend data is available */}
        {!loading && !error && classes.length > 0 && (
          <>
            
            {/* Mobile layout */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {classes.map((fitnessClass, index) => (
                <article
                  key={getClassKey(fitnessClass, index)}
                  className="group relative overflow-hidden rounded-xl border border-line bg-surface shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-black/30"
                >
                  {/* Lime accent along the top */}
                  <div className="h-1 w-full bg-primary" />

                  <div className="p-5 sm:p-6">
                    {/* Class title and level */}
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-1 text-xs font-bold uppercase tracking-[1.5px] text-primary">
                          CLASS {String(index + 1).padStart(2, '0')}
                        </p>

                        <h3 className="break-words text-xl font-extrabold leading-tight text-text transition-colors duration-200 group-hover:text-primary">
                          {fitnessClass.name}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary">
                        {fitnessClass.level || 'All Levels'}
                      </span>
                    </div>

                    {/* Class details */}
                    <dl className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-line bg-background p-3">
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                          Day
                        </dt>
                        <dd className="break-words text-sm font-medium text-text">
                          {fitnessClass.day || 'To be confirmed'}
                        </dd>
                      </div>

                      <div className="rounded-lg border border-line bg-background p-3">
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                          Time
                        </dt>
                        <dd className="break-words text-sm font-medium text-text">
                          {getClassTime(fitnessClass)}
                        </dd>
                      </div>

                      <div className="col-span-2 rounded-lg border border-line bg-background p-3">
                        <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                          Trainer
                        </dt>
                        <dd className="break-words text-sm font-medium text-text">
                          {getTrainerName(fitnessClass)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop layout */}
            <div className="hidden overflow-hidden rounded-card border border-line md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead className="bg-primary text-[#111111]">
                  <tr>
                    <th
                      scope="col"
                      className="w-[23%] px-3 py-4 font-extrabold lg:px-5"
                    >
                      Class
                    </th>

                    <th
                      scope="col"
                      className="w-[15%] px-3 py-4 font-extrabold lg:px-5"
                    >
                      Day
                    </th>

                    <th
                      scope="col"
                      className="w-[19%] px-3 py-4 font-extrabold lg:px-5"
                    >
                      Time
                    </th>

                    <th
                      scope="col"
                      className="w-[25%] px-3 py-4 font-extrabold lg:px-5"
                    >
                      Trainer
                    </th>

                    <th
                      scope="col"
                      className="w-[18%] px-3 py-4 font-extrabold lg:px-5"
                    >
                      Level
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {classes.map((fitnessClass, index) => (
                    <tr
                      key={getClassKey(fitnessClass, index)}
                      className={`border-t border-line transition-colors duration-200 hover:bg-[#303030] ${
                        index % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'
                      }`}
                    >
                      <td className="wrap-break-words px-3 py-4 text-sm font-semibold text-text lg:px-5">
                        {fitnessClass.name}
                      </td>

                      <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">
                        {fitnessClass.day || 'To be confirmed'}
                      </td>

                      <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">
                        {getClassTime(fitnessClass)}
                      </td>

                      <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">
                        {getTrainerName(fitnessClass)}
                      </td>

                      <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">
                        {fitnessClass.level || 'All Levels'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
