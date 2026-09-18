"use client";

import { useState } from "react";

const goals = [
  "Make my first $100 online",
  "Reach $500/month",
  "Reach $1,000/month",
  "Build a real online business",
];

const budgets = [
  "$0",
  "Under $100",
  "$100 – $500",
  "$500+",
];

const times = [
  "30 minutes a day",
  "1–2 hours a day",
  "3–4 hours a day",
  "5+ hours a day",
];

const skillOptions = [
  "Video editing",
  "Design",
  "Writing / content",
  "Sales / communication",
  "Coding / AI tools",
  "I'm not sure yet",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [outreach, setOutreach] = useState("");
  const [aiPath, setAiPath] = useState("");
const [aiReason, setAiReason] = useState("");
const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState("");

const generateAiRecommendation = async () => {
  try {
    setAiLoading(true);
    setAiError("");

    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal,
        budget,
        time,
        skills,
        interests,
        outreach,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI recommendation failed");
    }

    setAiPath(data.recommendedPath);
    setAiReason(data.reason);
    setStep(7);
  } catch (error) {
    console.error("AI recommendation error:", error);
    setAiError("Could not generate your path. Please try again.");
  } finally {
    setAiLoading(false);
  }
};

  const resetQuest = () => {
    setGoal("");
    setBudget("");
    setTime("");
    setSkills([]);
    setInterests([]);
    setOutreach("");
    setStep(1);
  };
  const getRecommendedPath = () => {
    if (
      interests.includes("AI / software") ||
      skills.includes("Coding / AI tools")
    ) {
      return "AI Automation Services";
    }
  
    if (
      interests.includes("Content / social media") ||
      skills.includes("Video editing")
    ) {
      return "Short-Form Content Service";
    }
  
    if (
      interests.includes("E-commerce")
    ) {
      return "E-commerce Product Research";
    }
  
    if (
      interests.includes("Marketing / sales") ||
      skills.includes("Sales / communication")
    ) {
      return "Lead Generation Service";
    }
  
    if (
      skills.includes("Design") ||
      skills.includes("Writing / content")
    ) {
      return "Freelance Creative Services";
    }
  
    return "7-Day Skill Discovery Sprint";
  };

  if (step === 2) {
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>

          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-10">
              <div className="mb-4 text-sm font-medium text-emerald-400">
                Step 2 of 6
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-2/6 rounded-full bg-emerald-400" />
              </div>
            </div>

            <p className="text-sm text-zinc-500">STARTING POINT</p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              What&apos;s your starting budget?
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              No money is totally fine. We&apos;ll choose paths that fit what you have.
            </p>

            <div className="mt-10 space-y-3">
              {budgets.map((item) => (
                <button
                  key={item}
                  onClick={() => setBudget(item)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    budget === item
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>

              <button
                onClick={() => setStep(3)}
                disabled={!budget}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                Continue →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>

          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-10">
              <div className="mb-4 text-sm font-medium text-emerald-400">
                Step 3 of 6
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-3/6 rounded-full bg-emerald-400" />
              </div>
            </div>

            <p className="text-sm text-zinc-500">YOUR TIME</p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              How much time can you commit?
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              We&apos;ll avoid paths that don&apos;t fit your real schedule.
            </p>

            <div className="mt-10 space-y-3">
              {times.map((item) => (
                <button
                  key={item}
                  onClick={() => setTime(item)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    time === item
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>

              <button
                onClick={() => setStep(4)}
                disabled={!time}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                Continue →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (step === 4) {
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>

          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-10">
              <div className="mb-4 text-sm font-medium text-emerald-400">
                Step 4 of 6
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-4/6 rounded-full bg-emerald-400" />
              </div>
            </div>

            <p className="text-sm text-zinc-500">YOUR SKILLS</p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              What are you already good at?
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              Pick everything that applies. You don&apos;t need to be an expert.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {skillOptions.map((item) => {
                const selected = skills.includes(item);

                return (
                  <button
                    key={item}
                    onClick={() =>
                      setSkills(
                        selected
                          ? skills.filter((skill) => skill !== item)
                          : [...skills, item]
                      )
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-emerald-400 bg-emerald-400/10"
                        : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>

              <button
              onClick={() => setStep(5)}
                disabled={skills.length === 0}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                Continue →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }
  if (step === 5) {
    const interestOptions = [
      "Freelancing / services",
      "Content / social media",
      "E-commerce",
      "AI / software",
      "Marketing / sales",
      "I want to explore",
    ];
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-10">
              <div className="mb-4 text-sm font-medium text-emerald-400">
                Step 5 of 6
              </div>
  
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-5/6 rounded-full bg-emerald-400" />
              </div>
            </div>
  
            <p className="text-sm text-zinc-500">WHAT SOUNDS INTERESTING?</p>
  
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              What would you actually like to try?
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              Pick anything that sounds interesting. You&apos;re not committing to it forever.
            </p>
  
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {interestOptions.map((item) => {
                const selected = interests.includes(item);
  
                return (
                  <button
                    key={item}
                    onClick={() =>
                      setInterests(
                        selected
                          ? interests.filter((interest) => interest !== item)
                          : [...interests, item]
                      )
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-emerald-400 bg-emerald-400/10"
                        : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
  
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>
  
              <button
              onClick={() => setStep(6)}
                disabled={interests.length === 0}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                Continue →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }
  if (step === 6) {
    const outreachOptions = [
      "I'm comfortable reaching out to people",
      "I can do it if I have a clear script",
      "I'd prefer minimal client interaction",
      "I'd rather avoid sales completely",
    ];
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-10">
              <div className="mb-4 text-sm font-medium text-emerald-400">
                Step 6 of 6
              </div>
  
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-full rounded-full bg-emerald-400" />
              </div>
            </div>
  
            <p className="text-sm text-zinc-500">ONE LAST THING</p>
  
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              How do you feel about finding clients?
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              Be honest. We&apos;ll use this to choose a path you&apos;ll actually stick with.
            </p>
  
            <div className="mt-10 space-y-3">
              {outreachOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setOutreach(item)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    outreach === item
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
  
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(5)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>
  
              <button
              onClick={generateAiRecommendation}
                disabled={!outreach}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                Find my path →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }
  if (step === 7) {
    const recommendedPath = aiPath || getRecommendedPath();
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-4 text-sm font-medium text-emerald-400">
              YOUR FIRST QUEST
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              We found a path worth trying.
            </h1>
  
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              This isn&apos;t your career forever. It&apos;s your first real experiment
              to see what can make you money.
            </p>
  
            <div className="mt-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-7">
              <p className="text-sm font-medium text-emerald-400">
                RECOMMENDED PATH
              </p>
  
              <h2 className="mt-3 text-3xl font-semibold">
                {recommendedPath}
              </h2>
  
              {aiReason && (
  <p className="mt-4 leading-7 text-zinc-400">
    {aiReason}
  </p>
)}

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">GOAL</p>
                  <p className="mt-1 text-sm">{goal}</p>
                </div>
  
                <div className="rounded-xl bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">BUDGET</p>
                  <p className="mt-1 text-sm">{budget}</p>
                </div>
  
                <div className="rounded-xl bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">TIME</p>
                  <p className="mt-1 text-sm">{time}</p>
                </div>
              </div>
            </div>
  
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-xs font-medium tracking-wider text-zinc-500">
                YOUR FIRST MISSION
              </p>
  
              <h3 className="mt-2 text-xl font-medium">
                Understand the path and complete your first real action.
              </h3>
  
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                MoneyQuest will turn this path into a 7-day experiment with
                concrete missions instead of endless research.
              </p>
            </div>
  
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(6)}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                ← Back
              </button>
  
              <button 
              onClick={() => setStep(8)}
              className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
                Start this quest →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }
  if (step === 8) {
    const recommendedPath = getRecommendedPath();
  
    const firstMissions: Record<string, string> = {
      "AI Automation Services":
        "Find 5 small businesses that repeat the same manual task every day.",
      "Short-Form Content Service":
        "Find 5 creators or businesses whose short-form content you could improve.",
      "E-commerce Product Research":
        "Find 5 products that are already selling and identify why people buy them.",
      "Lead Generation Service":
        "Find 5 businesses that clearly need more leads or customers.",
      "Freelance Creative Services":
        "Create one simple example of the service you could sell.",
      "7-Day Skill Discovery Sprint":
        "Choose one skill you are curious about and spend 30 minutes trying it.",
    };
  
    const mission =
      firstMissions[recommendedPath] ??
      "Complete one real action toward earning your first money online.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 1 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your first mission.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              Don&apos;t research for three hours. Complete one real action.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 1 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +50 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[14%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 1 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(9)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 9) {
    const recommendedPath = getRecommendedPath();
  
    const secondMissions: Record<string, string> = {
      "AI Automation Services":
        "Pick one of those businesses and write down one repetitive task you could automate for them.",
      "Short-Form Content Service":
        "Pick one creator and make one improved short-form content idea for them.",
      "E-commerce Product Research":
        "Choose one product and write down its target customer, price range, and main reason people buy it.",
      "Lead Generation Service":
        "Pick one business and write a simple offer explaining how you could help them get more leads.",
      "Freelance Creative Services":
        "Turn your sample into a simple offer someone could understand in 10 seconds.",
      "7-Day Skill Discovery Sprint":
        "Spend another 30 minutes practicing the skill and create one small result you can show.",
    };
  
    const mission =
      secondMissions[recommendedPath] ??
      "Take one concrete step toward turning your chosen path into something you could sell.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 2 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Keep the momentum.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              Yesterday you explored the problem. Today you make it more concrete.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 2 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +50 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[28%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 2 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(10)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 10) {
    const recommendedPath = getRecommendedPath();
  
    const thirdMissions: Record<string, string> = {
      "AI Automation Services":
        "Write a simple one-sentence offer for how you could automate that repetitive task for the business.",
      "Short-Form Content Service":
        "Write a simple offer explaining how you could help the creator get better short-form content.",
      "E-commerce Product Research":
        "Write a one-sentence product angle explaining who the product is for and why they would buy it.",
      "Lead Generation Service":
        "Write a clear one-sentence offer promising a specific lead-generation outcome for the business.",
      "Freelance Creative Services":
        "Write a one-sentence offer that clearly says what you create, for who, and what result it gives.",
      "7-Day Skill Discovery Sprint":
        "Write down one simple way this skill could help another person or business.",
    };
  
    const mission =
      thirdMissions[recommendedPath] ??
      "Turn what you learned into one clear offer someone could understand instantly.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 3 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Turn it into an offer.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              People can&apos;t buy what they don&apos;t understand.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 3 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +50 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[42%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 3 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(11)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 11) {
    const recommendedPath = getRecommendedPath();
  
    const fourthMissions: Record<string, string> = {
      "AI Automation Services":
        "Send your offer to 5 businesses that could benefit from the automation you identified.",
      "Short-Form Content Service":
        "Send your offer to 5 creators or businesses and include your content idea or sample.",
      "E-commerce Product Research":
        "Find 5 potential sellers or stores and compare how they position similar products.",
      "Lead Generation Service":
        "Send your lead-generation offer to 5 businesses that could use more customers.",
      "Freelance Creative Services":
        "Send your offer and sample to 5 potential clients.",
      "7-Day Skill Discovery Sprint":
        "Show your work to 3 people and ask whether they would find this skill useful.",
    };
  
    const mission =
      fourthMissions[recommendedPath] ??
      "Put your offer in front of 5 real people who could potentially pay for it.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 4 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Put it in front of people.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              An offer becomes real only when someone else sees it.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 4 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +75 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[57%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 4 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(12)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 12) {
    const recommendedPath = getRecommendedPath();
  
    const fifthMissions: Record<string, string> = {
      "AI Automation Services":
        "Review the responses or silence from yesterday. Improve your offer so the value is clearer and more specific.",
      "Short-Form Content Service":
        "Review how people reacted to your outreach and improve your pitch or sample based on what felt weak.",
      "E-commerce Product Research":
        "Compare the strongest product angles you found and choose one that feels easiest to test.",
      "Lead Generation Service":
        "Improve your offer based on responses, objections, or lack of replies.",
      "Freelance Creative Services":
        "Improve your offer or sample based on how potential clients reacted.",
      "7-Day Skill Discovery Sprint":
        "Review the feedback you got and decide what part of the skill is worth improving next.",
    };
  
    const mission =
      fifthMissions[recommendedPath] ??
      "Review what happened yesterday and improve your offer based on real feedback.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 5 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Learn from the market.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              No reply is still information. Use it.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 5 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +75 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[71%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 5 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(13)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 13) {
    const recommendedPath = getRecommendedPath();
  
    const sixthMissions: Record<string, string> = {
      "AI Automation Services":
        "Send your improved automation offer to 5 new businesses and make the value as specific as possible.",
      "Short-Form Content Service":
        "Send your improved pitch or sample to 5 new creators or businesses.",
      "E-commerce Product Research":
        "Choose one product angle and write a simple test plan for how you would validate demand.",
      "Lead Generation Service":
        "Send your improved lead-generation offer to 5 new businesses.",
      "Freelance Creative Services":
        "Send your improved offer and sample to 5 new potential clients.",
      "7-Day Skill Discovery Sprint":
        "Create one better version of your work and show it to 3 new people.",
    };
  
    const mission =
      sixthMissions[recommendedPath] ??
      "Take your improved offer back to the market and test it again.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 6 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Test the improved version.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              One attempt tells you almost nothing. Test again with what you learned.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 6 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +100 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[85%] rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 6 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(14)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Complete mission ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 14) {
    const recommendedPath = getRecommendedPath();
  
    const seventhMissions: Record<string, string> = {
      "AI Automation Services":
        "Review your 7-day experiment. Decide whether this path showed enough interest to keep going for another week.",
      "Short-Form Content Service":
        "Review your outreach, replies, and samples. Decide whether this path is worth another 7 days.",
      "E-commerce Product Research":
        "Review the product ideas you found and choose whether one is strong enough to keep validating.",
      "Lead Generation Service":
        "Review your outreach and responses. Decide whether this service is worth continuing for another week.",
      "Freelance Creative Services":
        "Review your samples, outreach, and feedback. Decide whether this path is worth continuing.",
      "7-Day Skill Discovery Sprint":
        "Review what you enjoyed, what felt easy, and what people found useful. Decide what skill to explore next.",
    };
  
    const mission =
      seventhMissions[recommendedPath] ??
      "Review what you learned and decide whether to continue this path or try a different one.";
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
  
            <span className="text-sm text-zinc-500">Day 7 / 7</span>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-3 text-sm font-medium text-emerald-400">
              {recommendedPath}
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Finish the experiment.
            </h1>
  
            <p className="mt-4 text-lg text-zinc-400">
              The goal wasn&apos;t to get rich in seven days. It was to get real evidence.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wider text-zinc-500">
                  DAY 7 MISSION
                </p>
  
                <span className="text-sm font-medium text-emerald-400">
                  +150 XP
                </span>
              </div>
  
              <h2 className="mt-4 text-2xl font-semibold leading-9">
                {mission}
              </h2>
  
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-full rounded-full bg-emerald-400" />
              </div>
  
              <p className="mt-3 text-sm text-zinc-500">
                Quest progress: 7 of 7 days
              </p>
            </div>
  
            <button
            onClick={() => setStep(15)}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Finish quest ✓
            </button>
          </section>
        </div>
      </main>
    );
  }
  if (step === 15) {
    const recommendedPath = getRecommendedPath();
  
    return (
      <main className="min-h-screen bg-[#09090b] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
          <header>
            <a href="/" className="text-xl font-bold tracking-tight">
              MoneyQuest
            </a>
          </header>
  
          <section className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-4 text-sm font-medium text-emerald-400">
              QUEST COMPLETE
            </div>
  
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              You finished your first 7-day experiment.
            </h1>
  
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              You didn&apos;t just research {recommendedPath}. You actually tested it.
            </p>
  
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <p className="text-xs font-medium tracking-wider text-zinc-500">
                TOTAL REWARD
              </p>
  
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-semibold">550 XP</span>
                <span className="pb-1 text-sm text-emerald-400">
                  Quest completed ✓
                </span>
              </div>
  
              <p className="mt-5 text-zinc-400">
                Now decide whether this path showed enough potential to keep going,
                or whether you want to test something different.
              </p>
            </div>
  
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
              onClick={() => setStep(8)}
              className="rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200">
                Continue this path →
              </button>
  
              <button
                onClick={resetQuest}
                className="rounded-xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 transition hover:bg-zinc-900"
              >
                Try another path
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
        <header>
          <a href="/" className="text-xl font-bold tracking-tight">
            MoneyQuest
          </a>
        </header>

        <section className="flex flex-1 flex-col justify-center py-16">
          <div className="mb-10">
            <div className="mb-4 text-sm font-medium text-emerald-400">
              Step 1 of 6
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-1/6 rounded-full bg-emerald-400" />
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            LET&apos;S START WITH THE GOAL
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            What do you want to achieve?
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            We&apos;ll build your first earning path around this.
          </p>

          <div className="mt-10 space-y-3">
            {goals.map((item) => (
              <button
                key={item}
                onClick={() => setGoal(item)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  goal === item
                    ? "border-emerald-400 bg-emerald-400/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!goal}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            Continue →
          </button>
        </section>
      </div>
    </main>
  );
}