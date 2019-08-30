export const ValidateRegex = {
  Number: /\D/g,
  Letter: /^[^%*^~\'"\/\\<>|【】\[\],，!！?？]+$/g,
  LetterOrIntOrSpace: /^[0-9a-zA-Z ]*$/g,
  LetterEn: /^[a-zA-Z ]*$/g,
  Phone: /^[0-9#,*()-]*$/g,
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PostalCode: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
};
