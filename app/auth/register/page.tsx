"use client";

import React, { useState } from "react";
import { FullScreenFormWithImage } from "components/layouts/FullScreenFormWithImage/FullScreenFormWithImage";
import { Register } from "components/forms/Register/Register";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with email:", email);
  };

  return (
    <FullScreenFormWithImage>
      <Register />
    </FullScreenFormWithImage>
  );
}
