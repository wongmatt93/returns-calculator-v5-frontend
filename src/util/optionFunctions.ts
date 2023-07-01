import { OptionTransaction } from "../models/Stock";
import UserProfile from "../models/UserProfile";
import { updateUserProfile } from "../services/userService";

export const addOptionTransaction = async (
  userProfile: UserProfile,
  ticker: string,
  quantity: string,
  expirationDate: string,
  strikePrice: string,
  callPut: string,
  transactionType: string,
  premium: string,
  transactionDate: string
): Promise<void> => {
  // create new optionTransaction object
  const newOptionTransaction: OptionTransaction = {
    quantity: parseFloat(quantity),
    type: transactionType,
    transactionDate,
    callPut,
    strike: parseFloat(strikePrice),
    expirationDate,
    premium: parseFloat(premium),
  };

  // add new object to userProfile object
  const stockIndex: number = userProfile.stocks.findIndex(
    (stock) => stock.ticker === ticker
  );

  userProfile.stocks[stockIndex].optionTransactions.push(newOptionTransaction);

  await updateUserProfile(userProfile);
};

// get option summary
export const getOptionInfo = (option: OptionTransaction): string => {
  const { expirationDate, strike, callPut } = option;
  return `${expirationDate} ${strike} ${callPut}`;
};

// // get open options
// const openOptions = (options: OptionTransaction[]): OptionTransaction[] => {
//   // object to store different options
//   const optionsMap: { [id: string]: OptionTransaction[] } = {};

//   // array method to update the map
//   options.forEach((option) => {
//     const optionInfo: string = getOptionInfo(option);

//     if (!optionsMap[optionInfo]) {
//       optionsMap[optionInfo] = [];
//       optionsMap[optionInfo].push(option);
//     } else {
//     }
//   });
// };
