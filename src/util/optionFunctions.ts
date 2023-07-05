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
  return `${expirationDate} $${strike.toFixed(2)} ${callPut}`;
};

// get open options
export const getOpenOptions = (
  options: OptionTransaction[]
): { [id: string]: { [id: string]: number } } => {
  // this creates an object with all of the different options in portfolio
  const optionsMap: { [id: string]: { [id: string]: number } } = {};
  options.forEach((option) => {
    const { type, quantity } = option;
    const summary: string = getOptionInfo(option);

    if (!optionsMap[summary]) {
      optionsMap[summary] = {
        bto: 0,
        sto: 0,
      };
    }

    // adds quantity if open, subtracts quantity if close
    if (type === "bto") {
      optionsMap[summary].bto += quantity;
    } else if (type === "sto") {
      optionsMap[summary].sto += quantity;
    } else if (type === "btc") {
      optionsMap[summary].bto -= quantity;
    } else if (type === "stc") {
      optionsMap[summary].sto -= quantity;
    }
  });

  // delete any options that are empty
  Object.keys(optionsMap).forEach((option) => {
    const { bto, sto } = optionsMap[option];
    if (!bto && !sto) {
      delete optionsMap[option];
    } else if (!bto) {
      delete optionsMap[option].bto;
    } else if (!sto) {
      delete optionsMap[option].sto;
    }
  });

  return optionsMap;
};
