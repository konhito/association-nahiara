"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, UploadCloud, FileImage, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "../../lib/useTranslation";
import { getUploadPresignedUrl } from "../actions/upload";

export default function SubmitArtworkPage() {
  const { locale, isLoading } = useTranslation();
  
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Translations
  const tTitle = {
    es: "Sube tu flor al mundo",
    en: "Upload your flower to the world",
    de: "Lade deine Blume für die Welt hoch",
    fr: "Téléchargez votre fleur au monde",
    it: "Carica il tuo fiore nel mondo",
    zh: "将你的花朵上传到世界"
  }[locale] || "Upload your flower to the world";

  const tDesc = {
    es: "Completa este formulario para enviar tu obra a la Galería Global. Tu dibujo pasará a formar parte de nuestra colección internacional.",
    en: "Fill out this form to submit your artwork to the Global Gallery. Your drawing will become part of our international collection.",
    de: "Fülle dieses Formular aus, um dein Kunstwerk in die Globale Galerie einzureichen. Deine Zeichnung wird Teil unserer internationalen Sammlung.",
    fr: "Remplissez ce formulaire pour soumettre votre œuvre à la Galerie Mondiale. Votre dessin fera partie de notre collection internationale.",
    it: "Compila questo modulo per inviare la tua opera alla Galleria Globale. Il tuo disegno diventerà parte della nostra collezione internazionale.",
    zh: "填写此表格即可将你的作品提交到全球画廊。你的绘画将成为我们国际收藏的一部分。"
  }[locale] || "Fill out this form to submit your artwork to the Global Gallery";

  const tBack = { es: "Volver", en: "Back", de: "Zurück", fr: "Retour", it: "Indietro", zh: "返回" }[locale] || "Back";
  const tName = { es: "Nombre completo", en: "Full name", de: "Vollständiger Name", fr: "Nom complet", it: "Nome completo", zh: "全名" }[locale] || "Full name";
  const tCountry = { es: "País de origen o adopción", en: "Country of origin or adoption", de: "Herkunfts- oder Adoptionsland", fr: "Pays d'origine ou d'adoption", it: "Paese di origine o adozione", zh: "原籍国或收养国" }[locale] || "Country of origin or adoption";
  const tMessage = { es: "Mensaje o dedicatoria (Opcional)", en: "Message or dedication (Optional)", de: "Nachricht oder Widmung (Optional)", fr: "Message ou dédicace (Optionnel)", it: "Messaggio o dedica (Opzionale)", zh: "留言或奉献（可选）" }[locale] || "Message or dedication (Optional)";
  const tDrag = { es: "Arrastra y suelta tu archivo aquí", en: "Drag and drop your file here", de: "Ziehe deine Datei hierher", fr: "Glissez-déposez votre fichier ici", it: "Trascina e rilascia il tuo file qui", zh: "将文件拖放到此处" }[locale] || "Drag and drop your file here";
  const tOrClick = { es: "o haz clic para explorar", en: "or click to browse", de: "oder zum Durchsuchen klicken", fr: "ou cliquez pour parcourir", it: "o fai clic per sfogliare", zh: "或点击浏览" }[locale] || "or click to browse";
  const tLimit = { es: "JPG, PNG o PDF. Máximo 10MB.", en: "JPG, PNG or PDF. Max 10MB.", de: "JPG, PNG oder PDF. Max. 10 MB.", fr: "JPG, PNG ou PDF. Max 10 Mo.", it: "JPG, PNG o PDF. Max 10 MB.", zh: "JPG、PNG或PDF。最大10MB。" }[locale] || "JPG, PNG or PDF. Max 10MB.";
  
  const tSubmit = { es: "Subir obra", en: "Upload artwork", de: "Kunstwerk hochladen", fr: "Télécharger l'œuvre", it: "Carica opera", zh: "上传作品" }[locale] || "Upload artwork";
  const tUploading = { es: "Subiendo...", en: "Uploading...", de: "Wird hochgeladen...", fr: "Téléchargement...", it: "Caricamento in corso...", zh: "正在上传..." }[locale] || "Uploading...";
  const tSuccess = { es: "¡Obra recibida con éxito!", en: "Artwork received successfully!", de: "Kunstwerk erfolgreich erhalten!", fr: "Œuvre reçue avec succès!", it: "Opera ricevuta con successo!", zh: "作品已成功收到！" }[locale] || "Artwork received successfully!";
  const tError = { es: "Ocurrió un error al subir la foto.", en: "An error occurred while uploading.", de: "Beim Hochladen ist ein Fehler aufgetreten.", fr: "Une erreur est survenue lors du téléchargement.", it: "Si è verificato un errore durante il caricamento.", zh: "上传时发生错误。" }[locale] || "An error occurred while uploading.";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !country) return;

    setStatus("uploading");
    setUploadProgress(0);

    try {
      // 1. Get Presigned URL
      const { success, url, error } = await getUploadPresignedUrl(
        file.name, 
        file.type || "application/octet-stream"
      );

      if (!success || !url) {
        throw new Error(error || "No secure upload URL returned from server.");
      }

      // 2. Upload to S3 directly via XHR to capture progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentCompleted = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percentCompleted);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setStatus("success");
        } else {
          console.error("Upload failed:", xhr.responseText);
          setStatus("error");
        }
      });

      xhr.addEventListener('error', () => {
        console.error("Network error during upload");
        setStatus("error");
      });

      xhr.open('PUT', url);
      // S3 presigned PUT requires the exact Content-Type passed to the command
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      xhr.send(file);

    } catch (err) {
      console.error("Presign fetch failed:", err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <Link href="/evento-dibuja-flor" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-700 transition">
          <ChevronLeft className="w-5 h-5 mr-1" />
          {tBack}
        </Link>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {tTitle}
            </h1>
            <p className="mt-4 text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              {tDesc}
            </p>
          </div>

          {status === "success" ? (
             <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
               <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle className="w-10 h-10 text-emerald-600" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900 mb-2">{tSuccess}</h2>
               <Link href="/galeria-dibujos" className="mt-8 inline-block px-6 py-3 font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-md">
                 Ver Galería Global
               </Link>
             </div>
          ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">{tName} <span className="text-rose-500">*</span></label>
                   <input 
                     type="text" 
                     required
                     value={name}
                     onChange={e => setName(e.target.value)}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" 
                     placeholder="John Doe"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">{tCountry} <span className="text-rose-500">*</span></label>
                   <input 
                     type="text" 
                     required
                     value={country}
                     onChange={e => setCountry(e.target.value)}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" 
                     placeholder="Spain"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">{tMessage}</label>
                 <textarea 
                   rows={3}
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                   className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none" 
                   placeholder="Para mi abuela..."
                 />
               </div>

               {/* File Dropzone */}
               <div>
                  <div 
                    className={`mt-2 flex justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors ${file ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    style={{ cursor: 'pointer' }}
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
                             <label className="relative cursor-pointer rounded-md font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                               <span>{tDrag}</span>
                               <input ref={fileInputRef} type="file" className="sr-only" onChange={handleFileChange} accept="image/jpeg, image/png, application/pdf" />
                             </label>
                             <p className="pl-1">{tOrClick}</p>
                           </>
                        )}
                      </div>
                      <p className="text-xs leading-5 text-slate-500 mt-2">{tLimit}</p>
                    </div>
                  </div>
               </div>

               {status === "error" && (
                 <div className="mt-4 flex items-center gap-2 p-4 text-sm text-rose-800 bg-rose-50 border border-rose-200 rounded-xl">
                   <AlertCircle className="w-5 h-5 flex-shrink-0" />
                   {tError}
                 </div>
               )}

               {/* Submit Button */}
               <div className="pt-4">
                 <button
                   type="submit"
                   disabled={!file || !name || !country || status === "uploading"}
                   className="w-full flex justify-center items-center px-6 py-4 rounded-xl text-white bg-emerald-600 font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                 >
                   {status === "uploading" ? (
                      <div className="flex flex-col items-center w-full">
                        <div className="flex items-center text-white font-bold mb-1.5">
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                           {tUploading} {uploadProgress}%
                        </div>
                        <div className="w-full max-w-[200px] bg-emerald-800/40 rounded-full h-1.5 overflow-hidden">
                           <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                   ) : (
                     tSubmit
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
