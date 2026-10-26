
import { classes } from '../data/classes'

export function ClassSchedule() {
  return (
    <section id="class-schedule" className="border-t border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">FIND YOUR SESSION</p>
        <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">Our Class <span className="text-primary">Schedule.</span></h2>
        <p className="mx-auto mb-10 max-w-[650px] text-center leading-8 text-text-muted">Find a class that fits your routine and take the next step towards your fitness goals.</p>

        {/* Mobile layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {classes.map((fitnessClass, index) => (
            <article key={fitnessClass.id ?? `${fitnessClass.name}-${fitnessClass.day}-${index}`} className="rounded-card border border-line bg-surface p-5">
              <h3 className="mb-3 text-lg font-bold text-text">{fitnessClass.name}</h3>

              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-primary">Day</dt>
                  <dd className="wrap-break-words text-text-muted">{fitnessClass.day}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary">Time</dt>
                  <dd className="wrap-break-word text-text-muted">{fitnessClass.time}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary">Trainer</dt>
                  <dd className="wrap-break-words text-text-muted">{fitnessClass.trainer}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary">Level</dt>
                  <dd className="wrap-break-words text-text-muted">{fitnessClass.level}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* Tablet and desktop layout */}
        <div className="hidden overflow-hidden rounded-card border border-line md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <thead className="bg-primary text-[#111111]">
              <tr>
                <th scope="col" className="w-[23%] px-3 py-4 font-extrabold lg:px-5">Class</th>
                <th scope="col" className="w-[15%] px-3 py-4 font-extrabold lg:px-5">Day</th>
                <th scope="col" className="w-[19%] px-3 py-4 font-extrabold lg:px-5">Time</th>
                <th scope="col" className="w-[25%] px-3 py-4 font-extrabold lg:px-5">Trainer</th>
                <th scope="col" className="w-[18%] px-3 py-4 font-extrabold lg:px-5">Level</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((fitnessClass, index) => (
                <tr key={fitnessClass.id ?? `${fitnessClass.name}-${fitnessClass.day}-${index}`}
                  className={`border-t border-line transition-colors duration-200 hover:bg-[#303030] ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'}`}
                >
                  <td className="wrap-break-words px-3 py-4 text-sm font-semibold text-text lg:px-5">{fitnessClass.name}</td>
                  <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">{fitnessClass.day}</td>
                  <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">{fitnessClass.time}</td>
                  <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">{fitnessClass.trainer}</td>
                  <td className="wrap-break-words px-3 py-4 text-sm text-text-muted lg:px-5">{fitnessClass.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
