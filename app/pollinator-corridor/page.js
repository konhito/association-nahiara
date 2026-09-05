"use client";

import PollinatorAtlas from "../../components/PollinatorAtlas";
import { useTranslation } from "../../lib/useTranslation";

export default function PollinatorCorridorPage() {
  const { locale } = useTranslation();
  return <PollinatorAtlas locale={locale} />;
}
