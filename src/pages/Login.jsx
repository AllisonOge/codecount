/**
 * @module pages/Login
 * @description This module contains the Login component
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/useLogin";
import { useSignup } from "../features/auth/useSignup";
import { Form, Row, Button } from "react-bootstrap";
import Error from "../ui/Error";

/**
 * Login is a React functional component for the login page
 * @returns {JSX.Element} - Login component
 */
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
    <Row style={{ width: "30rem", margin: "2rem auto" }}>
      <div className="d-grid gap-2">
        <Button
          as="input"
          type="button"
          value={(toggle ? "Signup" : "Continue") + " with Google"}
        />
        <Button
          as="input"
          type="button"
          variant="secondary"
          value={(toggle ? "Signup" : "Continue") + " with Github"}
        />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            {...register("email", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.email && <Error>{errors?.email?.message}</Error>}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.password && <Error>{errors?.password?.message}</Error>}
        </Form.Group>
        {toggle && (
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value == getValues().password || "Password does not match",
              })}
              disabled={isLoading}
            />
            {errors?.confirmPassword && <Error>{errors?.confirmPassword?.message}</Error>}
          </Form.Group>
        )}
        <br />
        <Button as="input" type="submit" value="submit" disabled={isLoading} />
      </Form>
      {!toggle && (
        <p>
          Not a registered user?{" "}
          <Button
            as="input"
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
    </Row>
  );
}
