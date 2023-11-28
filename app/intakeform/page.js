"use client";

import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  RangeSlider,
  RadioGroup,
  Radio,
  FileInput,
} from "flowbite-react";

import { database } from "../firebase";
import { ref, push, set, onValue, get } from "firebase/database";

export default function IntakeForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    characterFraming: "",
    backgroundType: "",
    numberOfCharacters: "",
    budget: "",
    deadline: "",
    details: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // Add logic here to send the form data to Firebase
    const requestsRef = ref(database, "users/Elissa/requests");
    const snapshot = await get(requestsRef);
    const requestCount = snapshot.exists()
      ? Object.keys(snapshot.val()).length
      : 0;
    const newRequestKey = `request_${requestCount + 1}`;
    const newRequestRef = ref(
      database,
      `users/Elissa/requests/${newRequestKey}`
    );
    set(newRequestRef, formData);
  };

  // Handler for updating form data on input change
  const handleInputChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 text-center">
        Elissa Martial's Character Design Form
      </h1>

      <form
        className="max-w-md mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First Name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            placeholder="John"
            required
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last Name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Doe"
            required
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title of Project" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="My Project"
            required
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="characterFraming" value="Character Framing" />
          </div>
          <Select
            id="characterFraming"
            required
            onChange={(e) =>
              handleInputChange("characterFraming", e.target.value)
            }
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="headshot">Headshot</option>
            <option value="half body">Half Body</option>
            <option value="full body">Full Body</option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="backgroundType" value="Background Type" />
          </div>
          <Select
            id="backgroundType"
            required
            onChange={(e) =>
              handleInputChange("backgroundType", e.target.value)
            }
          >
            <option value="" disable selected>
              Select an option
            </option>
            <option value="complex">Complex</option>
            <option value="simple">Simple</option>
            <option value="single color">Single Color</option>
          </Select>
        </div>

        <fieldset className="flex max-w-md flex-col gap-4">
          <legend className="mb-4">Number of Characters</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="numberOfCharacters"
              name="numberOfCharacters"
              onChange={(e) =>
                handleInputChange("numberOfCharacters", e.target.value)
              }
            />
            <Label htmlFor="0">0</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="numberOfCharacters"
              name="numberOfCharacters"
              value="1"
              onChange={(e) =>
                handleInputChange("numberOfCharacters", e.target.value)
              }
            />
            <Label htmlFor="1">1</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="numberOfCharacters"
              name="numberOfCharacters"
              value="2"
              onChange={(e) =>
                handleInputChange("numberOfCharacters", e.target.value)
              }
            />
            <Label htmlFor="2">2</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="numberOfCharacters"
              name="numberOfCharacters"
              value="3+"
              onChange={(e) =>
                handleInputChange("numberOfCharacters", e.target.value)
              }
            />
            <Label htmlFor="3+">3+</Label>
          </div>
        </fieldset>

        <fieldset className="flex max-w-md flex-col gap-4">
          <legend className="mb-4">Budget</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="budget"
              name="budget"
              value="$0-$100"
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            <Label htmlFor="$0-$100">$0-$100</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="$100-$250"
              name="budget"
              value="$100-$250"
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            <Label htmlFor="$100-$250">$100-$250</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="$250-$500"
              name="budget"
              value="$250-$500"
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            <Label htmlFor="$250-$500">$250-$500</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="$500+"
              name="budget"
              value="$500+"
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            <Label htmlFor="$500+">$500+</Label>
          </div>
        </fieldset>

        {/* Estimated Deadline */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="deadline" value="Estimated Deadline" />
          </div>
          <TextInput
            id="deadline"
            type="date"
            required
            onChange={(e) => handleInputChange("deadline", e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="large"
              value="Describe your project in as much detail as possible."
            />
          </div>
          <TextInput
            id="details"
            type="text"
            sizing="lg"
            onChange={(e) => handleInputChange("details", e.target.value)}
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            id="file"
            helperText="Upload at least 3 reference images per character and 3 for the background (if applicable)"
            onChange={(e) => handleInputChange("file", e.target.files[0])}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
