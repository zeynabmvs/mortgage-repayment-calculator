import {FormValues} from "./definitions"


export const calculateMortgage = (data: FormValues) => {
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