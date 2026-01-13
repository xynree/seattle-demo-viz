export default function LowestRatio() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-screen mb-96">
      <p className="text-xl font-medium">
        Departments with the most Female to Male ratios
      </p>
      <div className="flex flex-col items-center ">
        <p>Civil Service Commissions</p>
        <div className="icons">
          {Array.from({
            length: 1,
          }).map((_,i) => (
            <span key={i} className="text-blue-500 material-symbols-outlined">man</span>
          ))}
          {Array.from({
            length: 9,
          }).map((_,i) => (
            <span key={i} className="text-red-500/60 material-symbols-outlined">
              woman
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p>Office of the Employee Ombud</p>
        <div className="icons">
          {Array.from({
            length: 1,
          }).map((_,i) => (
            <span key={i} className="text-blue-500 material-symbols-outlined">man</span>
          ))}
          {Array.from({
            length: 6,
          }).map((_,i) => (
            <span key={i} className="text-red-500/60 material-symbols-outlined">
              woman
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p>Education and Early Learning</p>
        <div className="icons">
          {Array.from({
            length: 1,
          }).map((_,i) => (
            <span key={i} className="text-blue-500 material-symbols-outlined">man</span>
          ))}
          {Array.from({
            length: 4,
          }).map((_,i) => (
            <span key={i} className="text-red-500/60 material-symbols-outlined">
              woman
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
