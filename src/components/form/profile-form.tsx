"use client";

import { Camera, Code, Edit2, Shield, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Session } from "@/lib/auth";
import { changeUserPassword } from "@/lib/auth/actions/change-user-password";
import { updateUserProfile } from "@/lib/auth/actions/update-user-profile";
import { CodeBlock } from "../code-block";

export const ProfileForm = ({ user }: { user: Session["user"] }) => {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await updateUserProfile(formData);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      setErrorMessage(result.message);
    }
    setIsPending(false);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await changeUserPassword(formData);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      router.refresh();
    } else {
      setErrorMessage(result.message);
    }
    setIsPending(false);
  };

  return (
    <div>
      <Tabs className="gap-8" defaultValue="profile">
        <TabsList className="h-12 w-full max-w-md gap-4 bg-white p-1.5 shadow">
          <TabsTrigger className="border-border" value="profile">
            <UserRound /> Account
          </TabsTrigger>
          <TabsTrigger className="border-border" value="password">
            <Shield /> Security
          </TabsTrigger>
          <TabsTrigger className="border-border" value="codeview">
            <Code /> Code View
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex rounded-md bg-white px-4 py-8" value="profile">
          <div className="h-full w-full">
            <form className="space-y-6" onSubmit={handleProfileUpdate}>
              {!!errorMessage && (
                <p className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-2 text-center text-red-700 text-sm">
                  {errorMessage}
                </p>
              )}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-full space-y-4">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      defaultValue={user.name.split(" ")[0]}
                      id="first-name"
                      name="first-name"
                      onChange={(e) => setIsValid(e.target.value === user.name.split(" ")[0])}
                      type="text"
                    />
                  </div>
                  <div className="w-full space-y-4">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      defaultValue={user.name.split(" ")[1]}
                      id="last-name"
                      name="last-name"
                      onChange={(e) => setIsValid(e.target.value === user.name.split(" ")[1])}
                      type="text"
                    />
                  </div>
                </div>
                <Label htmlFor="email">Email</Label>
                <Input defaultValue={user.email} disabled id="email" name="email" type="email" />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button onClick={() => router.back()} variant="secondary">
                  Cancel
                </Button>
                <Button disabled={isPending || isValid} type="submit">
                  {!!isPending && <Spinner />}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
          <div className="relative flex w-full flex-col items-center gap-y-4">
            <Avatar className="size-36">
              <AvatarImage alt={user.name} src={user.image || ""} />
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="absolute right-52 bottom-56">
              <Button className="rounded-full" size="icon">
                <Edit2 />
              </Button>
            </div>
            <h3 className="font-medium text-xl">{user.name}</h3>
            <Badge variant={user.banned ? "destructive" : "default"}>{user.role}</Badge>
            <Button variant="outline">
              {" "}
              <Camera /> Change Photo
            </Button>
          </div>
        </TabsContent>
        <TabsContent className="w-1/2 rounded-md bg-white px-4 py-8" value="password">
          <form className="space-y-6" onSubmit={handleChangePassword}>
            {!!errorMessage && (
              <p className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-2 text-center text-red-700 text-sm">{errorMessage}</p>
            )}
            <div className="space-y-4">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" name="current-password" required type="password" />
            </div>

            <div className="space-y-4">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" name="new-password" required type="password" />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button onClick={() => router.back()} variant="secondary">
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                {!!isPending && <Spinner />}
                Submit
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="codeview">
          <CodeBlock data={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
