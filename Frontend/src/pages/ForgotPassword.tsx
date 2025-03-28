import { ForgotForm } from "@/components/forgot-form";

export default function ForgotPassword() {
  return (
    <div className="w-full flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="">
        <ForgotForm />
      </div>
    </div>
  );
}
