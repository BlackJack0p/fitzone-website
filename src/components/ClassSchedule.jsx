import { classes } from '../data/classes'

export function ClassSchedule() {
  return (
    <section id="class-schedule"className="bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold text-text">Class Schedule</h2>

        <div className="overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-surface-alt">
              <tr>
                <th className="p-4">Class</th>
                <th className="p-4">Day</th>
                <th className="p-4">Time</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Level</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((fitnessClass) => (
                <tr key={fitnessClass.id} className="border-t border-line">
                  <td className="p-4">{fitnessClass.name}</td>
                  <td className="p-4">{fitnessClass.day}</td>
                  <td className="p-4">{fitnessClass.time}</td>
                  <td className="p-4">{fitnessClass.trainer}</td>
                  <td className="p-4">{fitnessClass.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
