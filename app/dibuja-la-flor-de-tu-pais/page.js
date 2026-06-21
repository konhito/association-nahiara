"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  FileImage,
  UploadCloud,
} from "lucide-react";
import { useTranslation } from "../../lib/useTranslation";
import { getUploadPresignedUrl } from "../actions/upload";

const fallbackCopy = {
  back: "Back",
  eventLink: "Event page",
  eyebrow: "Global artwork call",
  title: "Upload your flower to the world",
  description: "Send a drawing that connects a flower, a pollinator, and the place you call home.",
  formIntro:
    "Your artwork will be reviewed for the Global Gallery. Please include your name, country, and a clear image or PDF of the drawing.",
  illustrationAlt: "Popsy flower illustration for the artwork submission page",
  nameLabel: "Full name",
  namePlaceholder: "Your name",
  countryLabel: "Country of origin or adoption",
  countryPlaceholder: "Spain",
  messageLabel: "Message or dedication (optional)",
  messagePlaceholder: "A short note about your drawing",
  dragLabel: "Drag and drop your file here",
  browseLabel: "or click to browse",
  limit: "JPG, PNG or PDF. Max 10MB.",
  submit: "Upload artwork",
  uploading: "Uploading...",
  success: "Artwork received successfully!",
  galleryCta: "View Global Gallery",
  error: "An error occurred while uploading.",
};

export default function SubmitArtworkPage() {
  const router = useRouter();
  const { isLoading, t } = useTranslation();

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const copy = (key) => {
    const translationKey = `submitArtwork.${key}`;
    const translated = t(translationKey);
    return translated === translationKey ? fallbackCopy[key] || translated : translated;
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-600" />
      </div>
    );
  }

  const handleFileChange = (event) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files?.[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !name || !country) return;

    setStatus("uploading");
    setUploadProgress(0);

    try {
      const { success, url, error } = await getUploadPresignedUrl(
        file.name,
        file.type || "application/octet-stream"
      );

      if (!success || !url) {
        throw new Error(error || "No secure upload URL returned from server.");
      }

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded * 100) / event.total));
        }
      });

      xhr.addEventListener("load", () => {
        setStatus(xhr.status >= 200 && xhr.status < 300 ? "success" : "error");
      });

      xhr.addEventListener("error", () => {
        setStatus("error");
      });

      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      xhr.send(file);
    } catch (error) {
      console.error("Presign fetch failed:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-8 text-[#13352d] sm:px-6 md:py-12">
      <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center text-sm font-semibold text-[#355148] transition hover:text-[#0f5b48]"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          {copy("back")}
        </button>
        <Link
          href="/eventos/dia-de-los-polinizadores-2026"
          className="text-sm font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4"
        >
          {copy("eventLink")}
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[#d6c7a1] bg-white shadow-[0_18px_44px_-34px_rgba(7,44,38,0.7)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden bg-[#072c26] p-7 text-[#f7f4ec] md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(214,181,109,0.22),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(214,97,82,0.18),transparent_26%)]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6b56d]">
              {copy("eyebrow")}
            </p>
            <h1 className="mt-5 max-w-lg text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
              {copy("title")}
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-[#d7ded8]">
              {copy("description")}
            </p>
          </div>

          <div className="relative z-10 mt-8 rounded-2xl bg-[#f5f1e8] p-4">
            <Image
              src="/events/popsy-flower.svg"
              alt={copy("illustrationAlt")}
              width={960}
              height={960}
              priority
              className="mx-auto h-auto w-full max-w-[22rem]"
            />
          </div>
        </aside>

        <div className="p-6 md:p-10">
          <p className="mb-8 max-w-2xl text-sm leading-7 text-[#355148]">
            {copy("formIntro")}
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900">
                {copy("success")}
              </h2>
              <Link
                href="/galeria-dibujos"
                className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
              >
                {copy("galleryCta")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {copy("nameLabel")} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                    placeholder={copy("namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {copy("countryLabel")} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                    placeholder={copy("countryPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy("messageLabel")}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  placeholder={copy("messagePlaceholder")}
                />
              </div>

              <div
                className={`mt-2 flex justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors ${
                  file
                    ? "border-emerald-400 bg-emerald-50/50"
                    : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
              >
                <div className="text-center">
                  {file ? (
                    <FileImage className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                  )}

                  <div className="mt-4 flex flex-col items-center text-sm leading-6 text-slate-600">
                    {file ? (
                      <span className="font-semibold text-emerald-700">{file.name}</span>
                    ) : (
                      <>
                        <span className="font-semibold text-emerald-600">
                          {copy("dragLabel")}
                        </span>
                        <span>{copy("browseLabel")}</span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png, application/pdf"
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{copy("limit")}</p>
                </div>
              </div>

              {status === "error" ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  {copy("error")}
                </div>
              ) : null}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!file || !name || !country || status === "uploading"}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "uploading" ? (
                    <div className="flex w-full flex-col items-center">
                      <div className="mb-1.5 flex items-center font-bold text-white">
                        <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {copy("uploading")} {uploadProgress}%
                      </div>
                      <div className="h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-emerald-800/40">
                        <div
                          className="h-1.5 rounded-full bg-white transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    copy("submit")
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
