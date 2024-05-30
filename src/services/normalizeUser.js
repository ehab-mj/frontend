const normalizeUser = (data) => {
  return data.map((user) => ({
    _id: user._id,
    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },
    phone: user.phone,
    email: user.email,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  }));
};

export default normalizeUser;
