import { CheckIcon, LogoIcon } from "@/shared/components/icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-8">
      <h1 className="text-2xl font-bold">Buddys Web — Icon Test</h1>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-sm text-gray-500">Check (currentColor 테스트)</h2>
        <div className="flex items-center gap-6">
          <CheckIcon className="w-6 h-6 text-gray-900" />
          <CheckIcon className="w-6 h-6 text-blue-500" />
          <CheckIcon className="w-6 h-6 text-red-500" />
          <CheckIcon className="w-12 h-12 text-green-500" />
        </div>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-sm text-gray-500">Logo (원본 색 보존 테스트)</h2>
        <div className="flex items-center gap-6">
          <LogoIcon className="w-12 h-12" />
          <LogoIcon className="w-12 h-12 text-blue-500" /> 
          <LogoIcon className="w-24 h-24" />
        </div>
      </section>
    </main>
  );
}