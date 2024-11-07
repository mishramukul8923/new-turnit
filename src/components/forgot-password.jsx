"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify'; // Assuming react-toastify is used

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  
  // Handle form input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Prepare the data to be sent
    const postData = {
      email
    };

    try {
      const response = await fetch('/api/forgetPass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData), // Convert the object to a JSON string
      });

      if (!response.ok) {
        const errorData = await response.json(); // Extract error details from the response body
        const errorMessage = errorData.error || 'Failed to submit request';
        
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        throw new Error(errorMessage); // Throw error with detailed message
      }

      const result = await response.json();

      toast.success(result.message || 'Password reset link sent successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setEmail(''); // Clear email field after successful submission

    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCancel = () => {
    setEmail(''); // Clear email field on cancel
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit
          </Button>

          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
