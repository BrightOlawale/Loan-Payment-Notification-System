export interface NotificationData {
  name: string;
  loan_amount: number;
  email?: string;
  account_number?: string;
}

export function ConstructUnpaidNotification(data: NotificationData) {
  return `Greetings, ${data.name}. <br /> <br />
    You have a ${data.loan_amount} loan repayment which is due today. <br />
    Kindly make payment to ${data.account_number} <br />`;
}

export function ConstructRepaidNotification(data: NotificationData) {
  return `Greetings, ${data.name}. <br /> <br />
    you fully repaid your ${data.loan_amount} loan. Live free! <br />`;
}
