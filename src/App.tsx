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
    .transform((value, originalValue) => (originalValue === "" ? undefined : value)) // Convert empty string to undefined
    .typeError("Must be a number")
    .positive()
    .required("Required"),
  mortgageTerm: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Must be a number")
    .positive()
    .required("Required"),
  interestRate: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Must be a number")
    .positive()
    .required("Required"),
  mortgageType: yup
    .string()
    .oneOf(["repayment", "interestOnly"])
    .required("Required"),
});

const calculateMortgage = (data: FormValues) => {
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
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    // defaultValues: {
    //   mortgageType: "repayment",
    // },
  });

  const [results, setResults] = useState({
    totalPayment: 0,
    monthlyPayment: 0,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { monthlyPayment, totalPayment } = calculateMortgage(data);
    setResults({ ...results, monthlyPayment, totalPayment });
  };

  const clearForm = () => {
    reset();
    setResults({ monthlyPayment: 0, totalPayment: 0 });
  };

  return (
    <main className="w-full lg:w-[1000px] bg-white md:rounded-3xl h-full md:h-[580px] flex flex-col md:flex-row">
      {/* Calculator */}
      <div className="basis-1/2 flex flex-col px-5 py-7 md:p-11 items-start">
        <div className="w-full flex justify-between mb-8">
          <h1 className="font-bold text-fluid-xl">Mortgage Calculator</h1>
          <button
            onClick={() => clearForm()}
            className="text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-1 text-fluid-sm"
          >
            Clear all
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-[10px]"
        >
          <div
            className={`input-wrapper before:left-[1px] before:rounded-l before:content-['£'] ${
              errors.mortgageAmount && "before:input-wrapper-before-error"
            } `}
          >
            <label htmlFor="mortgageAmount" className="form-label">
              Mortgage Amount
            </label>
            <input
              id="mortgageAmount"
              type="float"
              {...register("mortgageAmount")}
              className={` ${
                errors.mortgageAmount &&
                "border-red hover:border-red focus:border-red focus:ring-red"
              } form-input pl-14   `}
            />

            <span className="form-error">
              {errors.mortgageAmount && errors.mortgageAmount.message}
            </span>
          </div>

          <div className="flex justify-between gap-5">
            <div
              className={`basis-1/2 input-wrapper before:right-[1px] before:rounded-r before:content-['years'] before:px-3 ${
                errors.mortgageTerm && "before:input-wrapper-before-error"
              } `}
            >
              <label htmlFor="mortgageTerm" className="form-label">
                Mortgage Term
              </label>
              <input
                id="mortgageTerm"
                type="number"
                {...register("mortgageTerm")}
                className={` ${
                  errors.mortgageTerm &&
                  "border-red hover:border-red focus:border-red focus:ring-red"
                } form-input pr-14   `}
              />

              <span className="form-error">
                {errors.mortgageTerm && errors.mortgageTerm.message}
              </span>
            </div>

            <div
              className={`basis-1/2 input-wrapper before:right-[1px] before:rounded-r before:content-['%'] ${
                errors.interestRate && "before:input-wrapper-before-error"
              } `}
            >
              <label htmlFor="interestRate" className="form-label">
                Interest Rate
              </label>
              <input
                id="interestRate"
                type="float"
                {...register("interestRate")}
                className={` ${
                  errors.interestRate &&
                  "border-red hover:border-red focus:border-red focus:ring-red"
                } form-input pr-14   `}
              />

              <span className="form-error">
                {errors.interestRate && errors.interestRate.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col ">
            <label htmlFor="mortgageType" className="form-label">
              Mortgage Type
            </label>

            <label
              htmlFor="repayment"
              className="option-label mb-[10px] relative"
            >
              <input
                type="radio"
                id="repayment"
                value="repayment"
                {...register("mortgageType", { required: true })}
                className="form-radio"
              />
              Repayment
            </label>
            <label htmlFor="interestOnly" className="option-label">
              <input
                type="radio"
                id="interestOnly"
                value="interestOnly"
                {...register("mortgageType", { required: true })}
                className="form-radio"
              />
              Interest Only
            </label>

            <span className="form-error">
              {errors.mortgageType && errors.mortgageType.message}
            </span>
          </div>

          <button
            type="submit"
            className="bg-lime transition-all hover:bg-lime/80 rounded-full flex justify-center items-center gap-[10px] py-4 px-6 font-bold min-w-11"
          >
            <img src={calculatorIcon} alt="" />
            Calculate Repayments
          </button>
        </form>
      </div>

      {/* Result */}
      <div className=" basis-1/2 bg-slate-900 md:rounded-r-3xl md:rounded-bl-[70px] p-11 flex justify-center ">
        {results.monthlyPayment !== 0 && results.totalPayment !== 0 ? (
          <div className="text-white">
            <h2 className="text-fluid-xl font-bold mb-5">Your results </h2>
            <p className="text-slate-500 mb-10">
              Your results are shown below based on the information you
              provided.To adjust the results, edit the form and click “calculate
              repayments” again.
            </p>
            <div className="bg-[#0d1b24] p-7 border-t-[3px] border-lime rounded-xl">
              <div className="border-b border-slate-500 mb-7 ">
                <div className="text-slate-500 mb-5 text-fluid-base">
                  Your monthly repayments
                </div>
                <div className="text-lime pb-7 text-fluid-4xl font-bold">
                  £ {results["monthlyPayment"]}
                </div>
              </div>
              <div>
                <div className="text-slate-500 mb-4 text-fluid-base">
                  Total you'll repay over the term
                </div>
                <div className="text-white font-bold text-fluid-xl">
                  {results["totalPayment"]}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center">
            <img src={emptyIllustration} alt="" />
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
    </main>
  );
}

export default App;
