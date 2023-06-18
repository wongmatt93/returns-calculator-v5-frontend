import { OptionTransaction } from "../models/Stock";

// get option summary
const getOptionInfo = (option: OptionTransaction): string => {
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
