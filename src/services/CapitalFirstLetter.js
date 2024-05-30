const CapitalFirstLetter = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).trim();
};

export default CapitalFirstLetter;
