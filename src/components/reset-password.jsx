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

export function ResetPassword() {
  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your current password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Current Password</Label>
             
            </div>
            <Input id="password" type="password" required />
          </div>
       
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
             
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm New Password</Label>
             
            </div>
            <Input id="password" type="password" required />
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
