// Shows a scrollable table of all simulation steps with hit/fault markers
export default function StepTable({ steps, frameCount, currentStep }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="step-table-wrap">
      <h3 className="table-title">Step-by-Step Trace</h3>
      <div className="table-scroll">
        <table className="step-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Page</th>
              {Array.from({ length: frameCount }).map((_, i) => (
                <th key={i}>F{i + 1}</th>
              ))}
              <th>Evicted</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep - 1;

              return (
                <tr
                  key={idx}
                  className={`
                    ${isCurrent ? 'row-current' : ''}
                    ${!isPast && !isCurrent ? 'row-future' : ''}
                    ${step.isHit ? 'row-hit' : 'row-fault'}
                  `}
                >
                  <td>{idx + 1}</td>
                  <td className="cell-page">{step.page}</td>
                  {Array.from({ length: frameCount }).map((_, fi) => (
                    <td key={fi} className={step.frames[fi] !== undefined ? 'cell-frame occupied' : 'cell-frame empty'}>
                      {step.frames[fi] !== undefined ? step.frames[fi] : '—'}
                    </td>
                  ))}
                  <td className="cell-evicted">
                    {step.evicted !== null ? step.evicted : '—'}
                  </td>
                  <td>
                    <span className={`badge ${step.isHit ? 'badge-hit' : 'badge-fault'}`}>
                      {step.isHit ? 'HIT' : 'FAULT'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
