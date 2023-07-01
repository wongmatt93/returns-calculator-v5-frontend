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
  // create new stockTransaction object
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

export const getQuantity = (stockTransactions: StockTransaction[]) =>
  stockTransactions.reduce((pv, cv) => cv.quantity + pv, 0);

export const getCurrentStockQuantity = (sortedTransactions: {
  [id: string]: StockTransaction[];
}): number => {
  const buyQuantity: number = getQuantity(sortedTransactions["buy"]);
  const sellQuantity: number = getQuantity(sortedTransactions["sell"]);

  return buyQuantity - sellQuantity;
};

export const getCost = (stockTransaction: StockTransaction[]): number =>
  stockTransaction.reduce((pv, cv) => cv.cost + pv, 0);

export const getCurrentStockCostBasis = (sortedTransactions: {
  [id: string]: StockTransaction[];
}): number => {
  const buyCostBasis: number = getCost(sortedTransactions["buy"]);
  const sellCostBasis: number = getCost(sortedTransactions["sell"]);

  return buyCostBasis - sellCostBasis;
};

export const getStockProfit = (sortedTransactions: {
  [id: string]: StockTransaction[];
}): number => {
  const buyQuantity: number = getQuantity(sortedTransactions["buy"]);
  const buyCostBasis: number = getCost(sortedTransactions["buy"]);
  const buyAverage: number = buyCostBasis / buyQuantity || 0;
  const sellQuantity: number = getQuantity(sortedTransactions["sell"]);
  const sellCostBasis: number = getCost(sortedTransactions["sell"]);
  const sellAverage: number = sellCostBasis / sellQuantity || 0;

  return buyQuantity - sellQuantity
    ? (sellAverage - buyAverage) * sellQuantity
    : sellCostBasis - buyCostBasis;
};
