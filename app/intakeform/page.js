'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Select, RangeSlider, RadioGroup, Radio, FileInput } from 'flowbite-react';

export default function Profile() {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-y-auto">
    
          {/* Large Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 text-center">
            Elissa Martial's Character Design Form
          </h1>
    
          
          <form className="max-w-md mx-auto flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput id="firstName" type="text" placeholder="John" required />
            </div>
    
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput id="lastName" type="text" placeholder="Doe" required />
            </div>
    
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title of Project" />
              </div>
              <TextInput id="title" type="text" placeholder="My Project" required />
            </div>
    
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
    
            <div>
              <div className="mb-2 block">
                <Label htmlFor="framing" value="Character Framing" />
              </div>
              <Select id="framing" required>
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="headshot">Headshot</option>
                <option value="half body">Half Body</option>
                <option value="full body">Full Body</option>
                {/* Add more countries as needed */}
              </Select>
            </div>
    
            <div>
              <div className="mb-2 block">
                <Label htmlFor="background" value="Background Type" />
              </div>
              <Select id="background" required>
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="complex">Complex</option>
                <option value="simple">Simple</option>
                <option value="single color">Single Color</option>
                {/* Add more countries as needed */}
              </Select>
            </div>
    
            <fieldset className="flex max-w-md flex-col gap-4">
                <legend className="mb-4">Number of Characters</legend>
                < div className="flex items-center gap-2">
                    <Radio id="0" name="numchar" value="0" defaultChecked />
                    <Label htmlFor="0">0</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="1" name="numchar" value="1" />
                    <Label htmlFor="1">1</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="2" name="numchar" value="2" />
                    <Label htmlFor="2">2</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="3+" name="numchar" value="3+" />
                    <Label htmlFor="3+">3+</Label>
                </div> 
            </fieldset>
    
            <fieldset className="flex max-w-md flex-col gap-4">
                <legend className="mb-4">Budget</legend>
                < div className="flex items-center gap-2">
                    <Radio id="$0-$100" name="budget" value="$0-$100" defaultChecked />
                    <Label htmlFor="$0-$100">$0-$100</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="$100-$250" name="budget" value="$100-$250" />
                    <Label htmlFor="$100-$250">$100-$250</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="$250-$500" name="budget" value="$250-$500" />
                    <Label htmlFor="$250-$500">$250-$500</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="$500+" name="budget" value="$500+" />
                    <Label htmlFor="$500+">$500+</Label>
                </div> 
            </fieldset>
            
            {/* Estimated Deadline */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Estimated Deadline" />
              </div>
              <TextInput id="deadline" type="date" required />
            </div>
    
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="large" value="Describe your project in as much detail as possible." />
                </div>
                <TextInput id="large" type="text" sizing="lg" />
            </div>
    
    
            <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="file" value="Upload file" />
                </div>
                <FileInput id="file" helperText="Upload at least 3 reference images per character and 3 for the background (if applicable)" />
            </div>
    
    
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      );
}