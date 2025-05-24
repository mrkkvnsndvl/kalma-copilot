import { storage } from "#imports";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupportedPlatform, matches, pdfjs } from "@/constants";
import { useForm } from "@tanstack/react-form";

const PopupForm = () => {
  const [values, setValues] = useState<PopupForm>({
    jobTitle: "",
    companyName: "",
    jobDescription: null,
    resume: null,
    openRouterAPIKey: "",
    aiModel: "",
  });

  const form = useForm({
    defaultValues: values,
    onSubmit: async ({ value }) => {
      try {
        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tab.url && !isSupportedPlatform(tab.url, matches)) {
          toast.error(
            "Current platform is not supported. Please launch Kalma Copilot on a supported platform such as Google Meet, Zoom, or Microsoft Teams."
          );
          return;
        }

        if (tab.id) {
          await browser.tabs.sendMessage(tab.id, {
            action: "inject-content",
          });
          await browser.runtime.sendMessage({
            type: "start-audio-capture",
            tabId: tab.id,
          });
        }
        await storage.setItem("local:popup-form", value);
      } catch (error) {
        toast.error("Failed to launch.");
      }
    },
  });

  useEffect(() => {
    const PopupForm = async () => {
      try {
        const values = await storage.getItem("local:popup-form");
        setValues(values as PopupForm);
      } catch (error) {
        toast.error("Failed to get interview setup data.");
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
          <h3 className="mb-2 text-base font-medium">Interview Setup</h3>
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
                  <Label htmlFor="jobTitle">Job Title</Label>
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
                  <Label htmlFor="companyName">Company Name</Label>
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
                  <Label htmlFor="jobDescription">Job Description</Label>
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
                  <Label htmlFor="resume">Resumé</Label>
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
          <h3 className="mb-2 text-base font-medium">OpenRouter Setup</h3>
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
                  <Label htmlFor="openRouterAPIKey">OpenRouter API Key</Label>
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
                  <Label htmlFor="aiModel">AI Model</Label>
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
        </div>
        <div className="px-4 pb-4">
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
