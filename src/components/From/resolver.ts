import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// ____________________________________________________________
//
export const resolver = yupResolver(
  yup.object().shape({
    name: yup.string().required("入力してください"),
    age: yup
      .number()
      .typeError("数値を入力してください")
      .integer("整数を入力してください")
      .positive("正の数を入力して下さい"),
    email: yup
      .string()
      .required("入力してください")
      .matches(
        /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        { message: "不正な形式です" }
      ),
    phone: yup.string().matches(/^[0-9]{2,5}-[0-9]{2,5}-[0-9]{2,5}$/, {
      message: "不正な形式です",
    }),
  })
);
