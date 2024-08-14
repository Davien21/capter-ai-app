import crypto from "crypto";

const getRandomKey = (length: number = 7) => {
  return crypto.randomBytes(length).toString("hex");
};

export { getRandomKey };
