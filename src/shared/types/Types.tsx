export type FormModel = {
    "current-savings": number,
    "yearly-contribution": number,
    "expected-return": number,
    "duration": number,
    "prevState"?: null
};

export type YearlyData = {
    "year": number,
    "yearlyInterest": number,
    "savingsEndOfYear": number,
    "yearlyContribution": number
};