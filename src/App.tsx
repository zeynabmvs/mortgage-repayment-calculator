import emptyIllustration from "./assets/images/illustration-empty.svg";
import calculatorIcon from "./assets/images/icon-calculator.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

// Define the shape of the form data
type FormValues = {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  mortgageType: "repayment" | "interestOnly";
};

// Define the validation schema
let schema = yup.object().shape({
  mortgageAmount: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .required("Mortgage amount is required"),
  mortgageTerm: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .integer("Mortgage term must be an integer")
    .required("Mortgage term is required"),
  interestRate: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .required("Interest rate is required"),
  mortgageType: yup
    .string()
    .oneOf(["repayment", "interestOnly"])
    .required("Mortgage type is required"),
});

const calculateMortgage = (data: FormValues) => {
  console.log(data);
  const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = data;
  const principal = mortgageAmount;
  const annualInterestRate = interestRate / 100;
  const numberOfPayments = mortgageTerm * 12;

  if (
    isNaN(principal) ||
    isNaN(annualInterestRate) ||
    isNaN(numberOfPayments) ||
    numberOfPayments === 0
  ) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
    };
  }

  const monthlyInterestRate = annualInterestRate / 12;
  let monthlyPayment;

  if (mortgageType === "repayment") {
    monthlyPayment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } else {
    monthlyPayment = principal * monthlyInterestRate;
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
  };
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [results, setResults] = useState({
    totalPayment: 0,
    monthlyPayment: 0,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const { monthlyPayment, totalPayment } = calculateMortgage(data);
    setResults({ ...results, monthlyPayment, totalPayment });
  };

  const clearForm = () => {
    reset();
    setResults({ monthlyPayment: 0, totalPayment: 0 });
  };

  return (
    <div className="w-full lg:w-[1000px] bg-white md:rounded-3xl h-full md:h-[580px] flex flex-col md:flex-row">
      {/* Calculator */}
      <div className="basis-1/2 text-slate-900 flex flex-col px-5 py-7 md:p-11 items-start">
        <div className="w-full flex justify-between mb-8">
          <h1 className="font-bold text-fluid-xl">Mortgage Calculator</h1>
          <button
            onClick={() => clearForm()}
            className="text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-1"
          >
            Clear all
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <div>
            <label htmlFor="mortgageAmount" className="form-label">
              Mortgage Amount
            </label>
            <input
              id="mortgageAmount"
              type="float"
              {...register("mortgageAmount")}
              className="form-input"
            />

            {errors.mortgageAmount && (
              <span className="text-red text-xs mt-[10px]">
                {errors.mortgageAmount.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="mortgageTerm" className="form-label">
              Mortgage Term
            </label>
            <input
              id="mortgageTerm"
              type="number"
              {...register("mortgageTerm")}
              className="form-input"
            />

            {errors.mortgageTerm && (
              <span className="text-red text-xs mt-[10px]">
                {errors.mortgageTerm.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="interestRate" className="form-label">
              Interest Rate
            </label>
            <input
              id="interestRate"
              type="float"
              {...register("interestRate")}
              className="form-input"
            />

            {errors.interestRate && (
              <span className="text-red text-xs mt-[10px]">
                {errors.interestRate.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="mortgageType" className="form-label">
              Mortgage Type
            </label>
            <select {...register("mortgageType")}>
              <option value="repayment">Repayment</option>
              <option value="interestOnly">Interest Only</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-lime transition-all hover:bg-lime/80 rounded-full text-slate-900 flex justify-center items-center gap-[10px] py-3 px-6 font-bold min-w-11"
          >
            <img src={calculatorIcon} alt="" />
            Calculate Repayments
          </button>
        </form>
      </div>

      {/* Result */}
      <div className=" basis-1/2 bg-slate-900 md:rounded-r-3xl md:rounded-bl-[70px] p-11 flex justify-center items-center text-center">
        {results.monthlyPayment !== 0 && results.totalPayment !== 0 ? (
          <div className="text-white">
            <h2>Your results </h2>
            <p className="text-slate-500">
              Your results are shown below based on the information you
              provided.To adjust the results, edit the form and click “calculate
              repayments” again.
            </p>
            <div className="bg-['#0d1b24'] p-7 border-t-[3px] border-lime rounded-xl">
              monthlyPayment: {results["monthlyPayment"]}
              totalPayment: {results["totalPayment"]}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img src={emptyIllustration} />
            <h2 className="text-white my-5 text-fluid-xl font-bold">
              Results shown here
            </h2>
            <p className="text-slate-500">
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
