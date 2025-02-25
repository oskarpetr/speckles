// address
const initialValuesAddress = {
  country: "",
  state: "",
  street: "",
  city: "",
  zip: "",
};

// assets
export const initialValuesAssetStep1 = {
  name: "",
  description: "",
  price: 0,
  currencyId: "",
  licenseId: "",
};

export const initialValuesAssetStep2 = {
  images: [],
  files: [],
  thumbnail: {},
};

export const initialValuesAssetStep3 = {
  tags: [],
};

// register
export const initialValuesRegisterStep1 = {
  fullName: "",
  email: "",
};

export const initialValuesRegisterStep2 = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const initialValuesRegisterStep3 = initialValuesAddress;

// files
export const initialValuesFile = {
  file: {},
  name: "",
  fileName: "",
};

// images
export const initialValuesImage = {
  image: {},
  alt: "",
};

// tags
export const initialValuesTag = {
  name: "",
};

// commets
export const initialValuesComment = {
  text: "",
};

// studios
export const initialValuesStudioStep1 = {
  logo: "",
  name: "",
  slug: "",
};

export const initialValuesStudioStep2 = {
  about: "",
  contactEmail: "",
  paymentEmail: "",
};

export const initialValuesStudioStep3 = initialValuesAddress;

export const initialValuesStudio = {
  ...initialValuesStudioStep1,
  ...initialValuesStudioStep2,
  ...initialValuesAddress,
};
