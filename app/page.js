"use client";
import "./globals.css";
import IntakeForm from "./intakeform/page.js";
import { useEffect } from "react";
import { database } from "./firebase";
import { getDatabase, ref, set } from "firebase/database";

export default function Home() {
  return <IntakeForm />;
}
