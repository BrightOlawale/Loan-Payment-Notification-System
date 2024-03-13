export default {
  type: "object",
  properties: {
    name: { type: "string" },
    loan_amount: { type: "number" },
    email: { type: "string" },
    account_number: { type: "string" },
    paid: { type: "boolean" },
  },
  required: ["name", "loan_amount", "email", "account_number", "paid"],
} as const;
