import { ModeToggle } from "@/components/mode-toggle";
import { ForgotPassword } from "@/components/forgot-password"
import { ThemeProvider } from "@/components/theme-provider";

export default function Page() {
  return (
    <>
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
<div className="fixed">
<ModeToggle/>
</div>
    <div className="flex h-screen w-full items-center justify-center px-4">
      <ForgotPassword />
    </div>
    </ThemeProvider>
    </>
  );
}