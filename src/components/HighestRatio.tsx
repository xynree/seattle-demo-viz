export default function HighestRatio() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center w-screen mb-96">
      <h3>
        What is the most <b>male</b> department in Seattle?
      </h3>
      <p>That would be...</p>
      <h3>The Seattle Fire Department.</h3>
      <p>For each female employee of the SFD</p>

      <p> There are 8 male employees. </p>
      <div className="icons">
      <span className="text-red-500/60 material-symbols-outlined">woman</span>

        {Array.from({
          length: 8,
        }).map((_,i) => (
          <span key={i} className="text-blue-500 material-symbols-outlined">man</span>
        ))}
      </div>

      <p>The fire department is fairly equitable.</p>
      <p>Female employees on average make $1.01 to the male $1.00 </p>

      <h3>The next runner up for most male department is</h3>
      <p>The Seattle Police Department (SPD).</p>

      <p>For each female SPD employee</p>


      <p> There are 3 male employees. </p>
      <div className="icons">
      <span className="text-red-500/60 material-symbols-outlined">woman</span>

        {Array.from({
          length: 3,
        }).map((_,i) => (
          <span key={i} className="text-blue-500 material-symbols-outlined">man</span>
        ))}
      </div>

      <p>However, in the SPD,</p>
      <p>Female employees on average make 91 cents to their male dollar.</p>
    </div>
  );
}
