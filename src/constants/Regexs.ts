import { Regex } from '@/types/type';

const REGEX: Regex = Object.freeze({
  email: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
  mobile: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  domainUrl: /^[a-zA-Z0-9-]+$/,
  notionUrl: /^https:\/\/[a-zA-Z0-9-]+\.notion\.site\//,
});

export default REGEX;
