import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/useLogin";

export default function Login() {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useLogin();

  const onSubmit = (d) => {
    console.log(d);
    const { email, password } = d;
    login(
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
