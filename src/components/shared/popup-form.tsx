import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pdfjs from "@/constants";
import { useForm } from "@tanstack/react-form";

const PopupForm = () => {
  const [values, setValues] = useState<PopupForm>({
    jobTitle: "",
    companyName: "",
    jobDescription: null,
    resume: null,
    openRouterAPIKey: "",
    aiModel: "",
    deepgramAPIKey: "",
  });

  const form = useForm({
    defaultValues: values,
    onSubmit: async ({ value }) => {
      try {
        await storage.setItem("local:popup-form", value);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const PopupForm = async () => {
      try {
        const values = await storage.getItem("local:popup-form");
        setValues(values as PopupForm);
      } catch (error) {
        toast.error("Failed to get interview setup");
      }
    };
    PopupForm();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col p-4 gap-y-2">
          <h3 className="mb-2 text-base font-medium">
            Interview Setup
          </h3>
          <form.Field
            name="jobTitle"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "Job title is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="jobTitle">Job Title (Required)</Label>
                  <Input
                    className="placeholder:text-sm"
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Enter job title"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "Company name is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="companyName">Company Name (Required)</Label>
                  <Input
                    className="placeholder:text-sm"
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name="jobDescription"
            validators={{
              onChange: ({ value }) =>
                value === null ? "Job description is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="jobDescription">
                    Job Description (Required)
                  </Label>
                  <Input
                    className="placeholder:text-sm"
                    type="file"
                    accept="application/pdf"
                    id="jobDescription"
                    name="jobDescription"
                    onChange={async (e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        try {
                          const arrayBuffer = await file.arrayBuffer();
                          const pdfDoc = await pdfjs.getDocument({
                            data: arrayBuffer,
                          }).promise;
                          let extractedText = "";
                          for (let i = 1; i <= pdfDoc.numPages; i++) {
                            const page = await pdfDoc.getPage(i);
                            const content = await page.getTextContent();
                            const pageText = content.items
                              .map((item: any) => item.str)
                              .join(" ");
                            extractedText += pageText + "\n";
                          }
                          field.handleChange(extractedText);
                        } catch (error) {
                          console.error(error);
                        }
                      } else {
                        field.handleChange(null);
                      }
                    }}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name="resume"
            validators={{
              onChange: ({ value }) => {
                return value === null ? "Resumé is required" : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="resume">Resumé (Required)</Label>
                  <Input
                    className="placeholder:text-sm"
                    type="file"
                    accept="application/pdf"
                    id="resume"
                    name="resume"
                    onChange={async (e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        try {
                          const arrayBuffer = await file.arrayBuffer();
                          const pdfDoc = await pdfjs.getDocument({
                            data: arrayBuffer,
                          }).promise;
                          let extractedText = "";
                          for (let i = 1; i <= pdfDoc.numPages; i++) {
                            const page = await pdfDoc.getPage(i);
                            const content = await page.getTextContent();
                            const pageText = content.items
                              .map((item: any) => item.str)
                              .join(" ");
                            extractedText += pageText + "\n";
                          }
                          field.handleChange(extractedText);
                        } catch (error) {
                          console.error(error);
                        }
                      } else {
                        field.handleChange(null);
                      }
                    }}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <h3 className="mb-2 text-base font-medium">API Configuration</h3>
          <form.Field
            name="openRouterAPIKey"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === "" ? "API key is required" : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="openRouterAPIKey">
                    OpenRouter API Key (Required)
                  </Label>
                  <Input
                    className="placeholder:text-sm"
                    type="password"
                    id="openRouterAPIKey"
                    name="openRouterAPIKey"
                    placeholder="Enter API key"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
                <div>
                  <h4 className="text-sm">How to get an OpenRouter API key?</h4>
                  <ul>
                    <ol className="text-xs">
                      1. Sign up for an account at the&nbsp;
                      <a
                        className="font-medium underline"
                        href="https://openrouter.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OpenRouter
                      </a>
                      &nbsp;website
                    </ol>
                    <ol className="text-xs">
                      2. Navigate to the API keys section in your account
                      dashboard and create an API key
                    </ol>
                    <ol className="text-xs">
                      3. Copy and paste the key into the field above
                    </ol>
                    <ol>4. Choose low latency AI model for fast response</ol>
                  </ul>
                </div>
              </div>
            )}
          </form.Field>
          <form.Field
            name="aiModel"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "API model is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="aiModel">AI Model (Required)</Label>
                  <Input
                    className="placeholder:text-sm"
                    type="text"
                    id="aiModel"
                    name="aiModel"
                    placeholder="Enter AI Model"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name="deepgramAPIKey"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === "" ? "API key is required" : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="deepgramAPIKey">
                    Deepgram API Key (Required)
                  </Label>
                  <Input
                    className="placeholder:text-sm"
                    type="password"
                    id="deepgramAPIKey"
                    name="deepgramAPIKey"
                    placeholder="Enter API key"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
                <div>
                  <h4 className="text-sm">How to get a Deepgram API key?</h4>
                  <ul>
                    <ol className="text-xs">
                      1. Sign up for an account at the&nbsp;
                      <a
                        className="font-medium underline"
                        href="https://deepgram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Deepgram
                      </a>
                      &nbsp;website
                    </ol>
                    <ol className="text-xs">
                      2. Navigate to the API keys section in your account
                      dashboard and create an API key
                    </ol>
                    <ol className="text-xs">
                      3. Copy and paste the key into the field above
                    </ol>
                  </ul>
                </div>
              </div>
            )}
          </form.Field>
        </div>
        <div className="p-4">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant="default"
          >
            Launch Kalma Copilot
          </Button>
        </div>
      </form>
    </>
  );
};

export default PopupForm;
