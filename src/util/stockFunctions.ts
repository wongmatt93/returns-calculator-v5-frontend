import { StockTransaction } from "../models/Stock";
import UserProfile from "../models/UserProfile";
import { updateUserProfile } from "../services/userService";

export const addStockTransaction = async (
  userProfile: UserProfile,
  ticker: string,
  quantity: string,
  cost: string,
  date: string,
  type: string
): Promise<void> => {
  // create new stockTransactionObject
  const newStockTransaction: StockTransaction = {
    quantity: parseFloat(quantity),
    type,
    cost: parseFloat(cost),
    date,
  };

  // add new object to userProfile object
  const stockIndex: number = userProfile.stocks.findIndex(
    (stock) => stock.ticker === ticker
  );

  userProfile.stocks[stockIndex].stockTransactions.push(newStockTransaction);

  await updateUserProfile(userProfile);
};

export const sortStockTransactionTypes = (
  stockTransactions: StockTransaction[]
): { [id: string]: StockTransaction[] } => {
  const newObject: { [id: string]: StockTransaction[] } = {
    buy: [],
    sell: [],
  };

  stockTransactions.forEach((transaction) => {
    transaction.type === "buy" && newObject["buy"].push(transaction);
    transaction.type === "sell" && newObject["sell"].push(transaction);
  });

  return newObject;
};

export const getCurrentStockQuantity = (
  stockTransactions: StockTransaction[]
): number => {
  const sortedTransactions: { [id: string]: StockTransaction[] } =
    sortStockTransactionTypes(stockTransactions);

  const buyQuantity: number = sortedTransactions["buy"].reduce(
    (pv, cv) => cv.quantity + pv,
    0
  );
  const sellQuantity: number = sortedTransactions["sell"].reduce(
    (pv, cv) => cv.quantity + pv,
    0
  );

  return buyQuantity - sellQuantity;
};

export const getStockProfit = (
  stockTransactions: StockTransaction[]
): number => {
  const sortedTransactions: { [id: string]: StockTransaction[] } =
    sortStockTransactionTypes(stockTransactions);

  const buyCost: number = sortedTransactions["buy"].reduce(
    (pv, cv) => cv.cost + pv,
    0
  );
  const sellCost: number = sortedTransactions["sell"].reduce(
    (pv, cv) => cv.cost + pv,
    0
  );

  return sellCost - buyCost;
};
