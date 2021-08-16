import declOfNum from "./declOfNum";

export const maxLength = (max: number) => (value: string) => {
  return value && value.length > max
    ? `Должно быть не более ${max} симв.`
    : false;
};

export const minValue = (min: number) => (value: string) => {
  return value && value.length < min
    ? `Должен быть не менее ${min} симв.`
    : false;
};

// export const notMore = (x) => (value) => {
//   return value && value.length < x ? value : value.slice(0, x);
// };

export const required = (value: string) =>
  value ? false : "Обязательное поле";

// export const email = (value) => {
//   return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Некорректный email"
//     : undefined;
// };

// export const addDashMaxValue = (value) => {
//   if (value) {
//     let key = value.split("-").join("");
//     if (key.length > 0) {
//       key = key.match(new RegExp(".{1,5}", "g")).join("-");
//     }
//     return key.slice(0, 29);
//   }
// };

// export const keyMinLength = (value) => {
//   return value && value.length < 29 ? `Длина пароля 25 символов` : undefined;
// };

// export const keyError = (value) => {
//   return value ? `Не верный ключ` : undefined;
// };

// export const validationForIpAndDomain = (value) => {
//   const firstEl = value.slice(0, 1);
//   if (firstEl <= 2) {
//     let totalValue = value
//       .split(".")
//       .map((el) => (el <= 255 ? el : 255))
//       .filter((_el, idx) => idx <= 3)
//       .join(".");

//     return totalValue.slice(0, 15);
//   } else {
//     return value;
//   }
// };

export const ipString = (value: string) => {
  return value &&
    !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i.test(value)
    ? "Некорректный ip"
    : undefined;
};

// export const domain = (value) => {
//   return value && !/.*\.\w{2,}$/i.test(value)
//     ? "Некорректный domain"
//     : undefined;
// };

export const mustBeOneNumber = (value: string) => {
  return value && !/[0-9]/.test(value)
    ? "Строка должна содержать хотя бы одно число"
    : false;
};

export const stringMustContainNumber = (count: number) => (value: string) => {
  const n = value.match(/\d/g) ?? [];
  const test: any = new Set(n);

  return value && [...test].length < count
    ? `Строка должна содержать ${count} ${declOfNum(count, [
        "уникальное",
        "уникальных",
        "уникальных",
      ])} ${declOfNum(count, ["число", "числа", "чисел"])}`
    : false;
};

export const mustBeOneCpecoalCharacter = (value: string) => {
  return value && !/[!@#$%^&*]/.test(value)
    ? "Строка должена содержать хотя бы один спец символ"
    : false;
};

export const stringMustContainCpecoalCharacter =
  (count: number) => (value: string) => {
    const n = value.match(/[!@#$%^&*]/g) ?? [];
    const test: any = new Set(n);
    return value && [...test].length < count
      ? `Строка должна содержать ${count} ${declOfNum(count, [
          "уникальный",
          "уникальных",
          "уникальных",
        ])}  ${declOfNum(count, [
          "спец символ",
          "спец символа",
          "спец символов",
        ])}`
      : false;
  };

// export const mustBeOneLowercase = (value) => {
//   return value && !/[a-z]/.test(value)
//     ? "Строка должна содержать хотя бы одну латинскую букву в нижнем регистре"
//     : undefined;
// };

// export const mustBeOneUppercase = (value) => {
//   return value && !/[A-Z]/.test(value)
//     ? "Строка должна содержать хотя бы одну латинскую букву в верхнем регистре"
//     : undefined;
// };

// export const password = (value) => {
//   const validations = [
//     required,
//     minValue(8),
//     maxLength(80),
//     mustBeOneNumber,
//     mustBeOneLowercase,
//     mustBeOneUppercase,
//   ];
//   let error;
//   if (!validations.length) return;
//   validations.forEach((validation) => {
//     if (error) return;
//     error = validation(value);
//   });
//   return error;
// };

// export const schema = (validations) => (value) => {
//   let error;
//   if (!validations.length) return;
//   validations.forEach((validation) => {
//     if (error) return;
//     error = validation(value);
//   });
//   return error;
// };
