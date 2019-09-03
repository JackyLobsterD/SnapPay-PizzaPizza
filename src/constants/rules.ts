export const ValidateRegex = {
  Number: /\D/g,
  Letter: /^[^%*^~\'"\/\\<>|【】\[\],，!！?？]+$/,
  LetterOrIntOrSpace: /^[0-9a-zA-Z ]+$/,
  LetterEn: /^[a-zA-Z ]*$/,
  Phone: /^[0-9#,*()-]*$/,
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PostalCode: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
};
