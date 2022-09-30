import agreeTxt from "../../elem/AgreementData.txt";

export const generateWordSet = async () => {
  let wordArr = [];
  await fetch(agreeTxt)
    .then((response) => response.text())
    .then((result) => {
      wordArr = result.split("\r\n");
    });
  return wordArr;
};
