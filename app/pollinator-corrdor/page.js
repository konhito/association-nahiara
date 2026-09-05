"use client";

import PollinatorAtlas from "../../components/PollinatorAtlas";
import { useTranslation } from "../../lib/useTranslation";

export default function PollinatorCorrdorPage() {
  const { locale } = useTranslation();
  return <PollinatorAtlas locale={locale} />;
}
