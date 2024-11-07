import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPassword() {
  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
        
          <Button type="submit" className="w-full">
            Submit
          </Button>

          <Button type="submit" className="w-full">
            Cancel
          </Button>
       
        </div>
      
      </CardContent>
    </Card>)
  );
}
