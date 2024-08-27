import emptyIllustration from "./assets/images/illustration-empty.svg";
import calculatorIcon from "./assets/images/icon-calculator.svg";

function App() {
  return (
    <div className="w-full lg:w-[1000px] bg-white md:rounded-3xl h-full md:h-[580px] flex flex-col md:flex-row">
      {/* Calculator */}
      <div className="basis-1/2 text-slate-900 flex flex-col px-5 py-7 md:p-11 items-start">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-fluid-xl">Mortgage Calculator</h1>
          <button onClick={() => console.log("clear")} className="text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-1">Clear all</button>
        </div>

        <button className="bg-lime transition-all hover:bg-lime/80 rounded-full text-slate-900 flex justify-center items-center gap-[10px] py-3 px-6 font-bold min-w-11">
          <img src={calculatorIcon} alt="" />
          Calculate Repayments
        </button>
      </div>

      {/* Result */}
      <div className=" basis-1/2 bg-slate-900 md:rounded-r-3xl md:rounded-bl-[70px] p-11 flex justify-center items-center flex-col text-center">
        <img src={emptyIllustration} />
        <h2 className="text-white my-5 text-fluid-xl font-bold">
          Results shown here
        </h2>
        <p className="text-slate-500">
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
    </div>
  );
}

export default App;
