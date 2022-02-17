import React from "react";
import { useForm } from "react-hook-form";
import { Error } from "../Error";
import { resolver } from "./resolver";
// ____________________________________________________________
//
const defaultValues = {
  name: "",
  age: "",
  email: "",
  phone: "",
};
// ____________________________________________________________
//
export const Form = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver,
    defaultValues,
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        setErrors([]);
        const data: { errors?: string[] } = await fetch(
          "http://api.example.com",
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => {
            if (!res.ok) throw res;
            return res.json();
          })
          .catch((err) => {
            if (err instanceof Response) {
              return err.json();
            }
            throw err;
          });
        if (data.errors) {
          setErrors(data.errors);
        }
      })}
    >
      <table>
        <tbody>
          <tr>
            <th>
              <label htmlFor="name">氏名</label>
            </th>
            <td>
              <input {...register("name")} id="name" />
              <Error error={formState.errors.name?.message} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="age">年齢</label>
            </th>
            <td>
              <input {...register("age")} id="age" />
              <Error error={formState.errors.age?.message} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="email">メール</label>
            </th>
            <td>
              <input {...register("email")} id="email" />
              <Error error={formState.errors.email?.message} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="phone">電話番号</label>
            </th>
            <td>
              <input {...register("phone")} id="phone" />
              <Error error={formState.errors.phone?.message} />
            </td>
          </tr>
        </tbody>
      </table>
      {!!errors.length && (
        <div>
          {errors.map((err, i) => (
            <Error key={i} error={err} />
          ))}
        </div>
      )}
      <div>
        <button>submit</button>
      </div>
    </form>
  );
};
