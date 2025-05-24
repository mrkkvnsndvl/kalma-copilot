import OpenAI from "openai";

const getPopupFormData = async (): Promise<{
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  resume: string;
  openRouterAPIKey: string;
  aiModel: string;
}> => {
  try {
    const data = await storage.getItem("local:popup-form");
    return data as {
      jobTitle: string;
      jobDescription: string;
      companyName: string;
      resume: string;
      openRouterAPIKey: string;
      aiModel: string;
    };
  } catch (error) {
    throw error;
  }
};

export const openrouterService = async (
  questionText: string
): Promise<string> => {
  try {
    const popupFormData = await getPopupFormData();
    const {
      jobTitle,
      jobDescription,
      companyName,
      resume,
      openRouterAPIKey,
      aiModel,
    } = popupFormData;

    const systemContent = `You are a job candidate interviewing for the position of "${jobTitle}" at "${companyName}". Your resume ("${resume}") highlights your expertise in ${jobDescription}. Answer the interview question using clear, natural English at a B2 proficiency level. Your answer must be concise and follow the STAR method exclusively.

    Please follow the exact format below using Markdown formatting so that the section headings are bold:

    **Situation:** Provide a brief overview of the context or challenge you faced.
    **Task:** Describe your specific responsibility or the challenge you needed to address.
    **Action:** Explain the steps you took and your approach to solving the problem.
    **Result:** Summarize the outcomes, including the impact and the lessons learned.

    In addition, structure your answer with the following question techniques in mind:
    Behavioral: Uses the STAR method to have candidates elaborate on past experiences.
    Situational: Presents hypothetical scenarios to assess problem-solving and decision-making skills.
    Open-Ended: Encourages detailed narratives and reflections.
    Competency-Based: Targets essential skills and requires examples showcasing those competencies.
    Follow-Up: Probes for further detail or clarification on initial answers to get a deeper understanding.

    Ensure your entire response strictly follows the above STAR structure without any numbering or additional formatting elements.`;

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: openRouterAPIKey,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: questionText,
        },
      ],
      temperature: 0.5,
    });
    return completion.choices[0].message.content!;
  } catch (error: any) {
    let message: string = "";

    switch (error?.status) {
      case 400:
        message = "Bad Request (invalid or missing params, CORS)";
        break;
      case 401:
        message =
          "Invalid credentials (OAuth session expired, disabled/invalid API key)";
        break;
      case 402:
        message =
          "Your account or API key has insufficient credits. Add more credits and retry the request.";
        break;
      case 403:
        message =
          "Your chosen model requires moderation and your input was flagged";
        break;
      case 408:
        message = "Your request timed out";
        break;
      case 429:
        message = "You are being rate limited";
        break;
      case 502:
        message =
          "Your chosen model is down or we received an invalid response from it";
        break;
      case 503:
        message =
          "There is no available model provider that meets your routing requirements";
        break;
      default:
        message = `${error?.status}: An unknown error occurred.`;
    }

    return message;
  }
};
