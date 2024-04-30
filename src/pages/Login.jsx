import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/useLogin";
import { useSignup } from  "../features/auth/useSignup";

export default function Login() {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { login, isLoading: isLogging } = useLogin();
  const { signup, isLoading: isCreating } = useSignup();

  const isLoading = isLogging || isCreating;

  const onSubmit = (d) => {
    const { email, password } = d;
    if (!toggle)
      login(
        { email, password },
        {
          onSettled: () => {
            reset();
          },
        }
      );
    else
      signup(
        { email, password },
        {
          onSettled: () => {
            reset();
          },
        }
      );
  };
  return (
    <>
      <div>
        <input
          type="button"
          value={(toggle ? "Signup" : "Continue") + " with Google"}
        />
        <br />
        <input
          type="button"
          value={(toggle ? "Signup" : "Continue") + " with Github"}
        />
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            {...register("email", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            {...register("password", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
        </div>
        {toggle && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value == getValues().password || "Password does not match",
              })}
              disabled={isLoading}
            />
          </div>
        )}
        {/* <pre>{form}</pre> */}
        <br />
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
      {!toggle && (
        <p>
          Not a registered user?{" "}
          <input
            type="button"
            value="Signup"
            onClick={() => {
              setToggle((state) => !state);
            }}
          />{" "}
        </p>
      )}
      {toggle && (
        <p>
          Already have an account?{" "}
          <input
            type="button"
            value="Signin"
            onClick={() => {
              setToggle((state) => !state);
            }}
          />{" "}
        </p>
      )}
    </>
  );
}
