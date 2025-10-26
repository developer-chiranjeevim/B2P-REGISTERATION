import crypto from "crypto";

function generatePassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const bytes = crypto.randomBytes(length);
  const passwordArray = new Array(length);

  for (let i = 0; i < length; i++) {
    passwordArray[i] = chars[bytes[i] % chars.length];
  }

  return passwordArray.join('');
}


export {generatePassword};
