// Define the shape of the form data
export type FormValues = {
    mortgageAmount: number;
    mortgageTerm: number;
    interestRate: number;
    mortgageType: "repayment" | "interestOnly";
  };
  