import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../lib/api/client";
import { setLocalstorage } from "../../lib/function/localstorage";
import { AuthInputForm } from "./types";

export default function useAuth() {
  const [form, setForm] = useState<AuthInputForm>({
    id: "",
    password: "",
    passwordConfirm: "",
  });
  const [authType, setAuthType] = useState<"login" | "regist">("login");
  const navigate = useNavigate();

  /** 로그인 & 회원가입 시 입력하는 값을 업데이트합니다. */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "id") {
      setForm({ ...form, id: e.target.value });
    } else if (e.target.id === "password") {
      setForm({ ...form, password: e.target.value });
    } else {
      setForm({ ...form, passwordConfirm: e.target.value });
    }
  };

  /** 입력값들을 초기화합니다. */
  const initialize = () => {
    setForm({ id: "", password: "", passwordConfirm: "" });
  };

  /** 로그인 & 회원가입 화면을 분기합니다. */
  const onAuthTypeChange = (type: "login" | "regist") => {
    if (type === "login") {
      setAuthType("regist");
    } else {
      setAuthType("login");
    }
    initialize();
  };

  const login = async () => {
    if (form.id === "" || form.password === "") {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    try {
      const response = await client.post<{ message: string; token: string }>(
        "/users/login",
        {
          email: form.id,
          password: form.password,
        }
      );
      const data = response.data;
      await setLocalstorage(data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const regist = async () => {
    try {
      const response = await client.post<{ message: string; token: string }>(
        "/users/create",
        {
          email: form.id,
          password: form.password,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    form,
    authType,
    onInputChange,
    onAuthTypeChange,
    login,
    regist,
  };
}
