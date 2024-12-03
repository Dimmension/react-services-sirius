import React, { useState } from "react";
import { Informer } from "@consta/uikit/Informer";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../token";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const fetchUserToken = async (username, password) => {
      const loginResponse = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 60
        })
      });

      if (!loginResponse.ok) {
        throw new Error("Данного пользователя нет в системе!");
      }

      return (await loginResponse.json()).accessToken;
    };

    try {
      saveToken(await fetchUserToken(username, password));
      navigate("/profile");
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <form onSubmit={onFormSubmit} style={styles.form}>
      <div style={styles.inputWrapper}>
        <label htmlFor="username" style={styles.label}>
          Логин:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          style={styles.input}
          placeholder="Введите логин"
        />
      </div>

      <div style={styles.inputWrapper}>
        <label htmlFor="password" style={styles.label}>
          Пароль:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          style={styles.input}
          placeholder="Введите пароль"
        />
      </div>

      {error && (
        <div style={styles.errorWrapper}>
          <Informer status="alert" view="filled" title="Ошибка" label={error} />
        </div>
      )}

      <div style={styles.submitWrapper}>
        <button type="submit" style={styles.submitButton}>
          Вход
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  inputWrapper: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  inputFocus: {
    borderColor: "#646cff",
    boxShadow: "0 0 0 3px rgba(100, 108, 255, 0.2)",
  },
  errorWrapper: {
    marginBottom: "16px",
  },
  submitWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#646cff",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  submitButtonHover: {
    backgroundColor: "#535bf2",
    transform: "scale(1.05)",
  },
};

export default AuthPage;
