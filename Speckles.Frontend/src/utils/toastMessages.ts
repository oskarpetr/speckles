const userMessages = {
  // auth
  login: "You have been logged in",
  logout: "You have been logged out",

  // comments
  likeComment: "Comment liked",
  unlikeComment: "Comment unliked",
  addedComment: "Comment added",
  removedComment: "Comment removed",

  // studios
  followStudio: (studioName: string) => `You are now following ${studioName}`,
  unfollowStudio: (studioName: string) =>
    `You are no longer following ${studioName}`,

  // saved assets
  addedToSaved: "Asset added to saved",
  removedFromSaved: "Asset removed from saved",

  // basket assets
  addedToBasket: "Asset added to basket",
  removedFromBasket: "Asset removed from basket",

  // profile
  updatedAvatar: "Avatar updated",

  // register
  register: "You have been registered",

  // payments
  orderSuccess: "Order was successful",
  orderFailed: "Order failed",
};

const studioMessages = {
  // studios
  createdStudio: "Studio created",
  updatedStudio: "Studio updated",
  removedStudio: "Studio removed",

  // assets
  addedAsset: "Asset added",
  updatedAsset: "Asset updated",
  removedAsset: "Asset removed",
  createdAsset: "Asset created",
  deletedAsset: "Asset deleted",

  // comments
  removedComment: "Comment removed",

  // members
  addedMember: "Member added",
  removedMember: "Member removed",

  // about
  updatedAbout: "About updated",
};

const toastMessages = {
  user: userMessages,
  studio: studioMessages,
};

export default toastMessages;
