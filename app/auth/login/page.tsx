"use client";

import React, { useState } from "react";
import { FullScreenFormWithImage } from "components/layouts/FullScreenFormWithImage/FullScreenFormWithImage";
import { Login } from "components/forms/Login/Login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with email:", email);
  };

  return (
    <FullScreenFormWithImage>
      <Login />
    </FullScreenFormWithImage>
  );
}
