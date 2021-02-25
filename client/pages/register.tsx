import { CreateUserDto } from "@common/dto/create-user.dto";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form, Button, Segment, Message, Icon } from "semantic-ui-react";
import { api } from "utils/api";

export default () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const { data, status } = await api.post<{ message: string}>("/auth/register", {
      email,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      password
    } as CreateUserDto);
    if (status < 300) {
      router.push("/login?from=register");
    } else {
      setError(data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Message
          attached="top"
          header="Create an account at ISConsultant"
          content="You will be able to arrange a meeting afterwards."
        />
        <Segment attached="bottom" style={{ width: "400px" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>First name:</label>
              <input
                placeholder="John"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                value={firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Middle name:</label>
              <input
                onChange={(e) => setMiddleName(e.target.value)}
                value={middleName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last name:</label>
              <input
                placeholder="Smith"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Form.Field>
            <Form.Field>
              <label>E-mail:</label>
              <input
                placeholder="example@example.org"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input
                placeholder=""
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Field>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button compact onClick={() => router.push("/login")}><Icon name="arrow left" />Back to Sign in</Button>
              <Button primary type="submit">
                Create account
              </Button>
            </div>
          </Form>
        </Segment>
        { error && <Message attached="bottom" color="red" content={ error } />}
      </div>
    </div>
  );
};
