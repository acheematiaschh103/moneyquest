import { NextResponse } from "next/server";

const allowedPaths = [
  "AI Automation Services",
  "Short-Form Content Service",
  "E-commerce Product Research",
  "Lead Generation Service",
  "Freelance Creative Services",
  "7-Day Skill Discovery Sprint",
];

export async function POST(request: Request) {
  try {
    const {
      goal,
      budget,
      time,
      skills,
      interests,
      outreach,
    } = await request.json();

    if (
      !goal ||
      !budget ||
      !time ||
      !Array.isArray(skills) ||
      !Array.isArray(interests) ||
      !outreach
    ) {
      return NextResponse.json(
        { error: "Missing onboarding data" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing" },
        { status: 500 }
      );
    }

    const prompt = `
You are the recommendation engine for MoneyQuest.

MoneyQuest helps young people stop endlessly researching ways to make money online
and instead choose one realistic path to test for 7 days.

USER PROFILE:

Goal: ${goal}
Starting budget: ${budget}
Available time: ${time}
Skills: ${skills.join(", ")}
Interests: ${interests.join(", ")}
Comfort with finding clients: ${outreach}

Choose EXACTLY ONE path from this list:

${allowedPaths.map((path) => `- ${path}`).join("\n")}

Choose the path that best fits the user's current skills, interests, budget,
available time, and willingness to interact with clients.

Do not promise guaranteed income.
Do not choose based on hype.
Prefer something the user can realistically begin testing immediately.

Return ONLY valid JSON in this exact format:

{
  "recommendedPath": "one exact path from the list",
  "reason": "2-3 concise sentences explaining why this path fits the user",
  "days": [
    {
      "day": 1,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 50
    },
    {
      "day": 2,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 50
    },
    {
      "day": 3,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 50
    },
    {
      "day": 4,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 75
    },
    {
      "day": 5,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 75
    },
    {
      "day": 6,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 100
    },
    {
      "day": 7,
      "title": "Short motivating title",
      "mission": "Concrete action for the user",
      "xp": 150
    }
  ]
}

The 7-day plan must:
- fit the selected path
- fit the user's budget and available time
- contain real-world actions, not vague research
- build progressively from Day 1 to Day 7
- include market validation where appropriate
- avoid promising guaranteed income
`;

let response: Response | undefined;

for (let attempt = 1; attempt <= 3; attempt++) {
  response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (response.ok) {
    break;
  }

  if (
    ![500, 502, 503, 504].includes(response.status) ||
    attempt === 3
  ) {
    break;
  }

  await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
}

if (!response) {
  throw new Error("Gemini request failed");
}

    if (!response.ok) {
      console.error("Gemini error:", await response.text());

      return NextResponse.json(
        { error: "AI recommendation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Gemini returned no content");
    }

    const result = JSON.parse(text);

    if (!allowedPaths.includes(result.recommendedPath)) {
      throw new Error("Gemini returned an invalid path");
    }
    
    if (!Array.isArray(result.days) || result.days.length !== 7) {
      throw new Error("Gemini returned an invalid 7-day plan");
    }
    
    return NextResponse.json({
      recommendedPath: result.recommendedPath,
      reason: result.reason,
      days: result.days,
    });
  } catch (error) {
    console.error("Recommend error:", error);

    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}