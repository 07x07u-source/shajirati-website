"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gulfCountries, trees, type GulfCountry } from "@/lib/trees";

export function GulfExplorer() {
  const [countryId, setCountryId] = useState<GulfCountry>("saudi");
  const country = gulfCountries.find((item) => item.id === countryId)!;
  const selectedTrees = country.treeSlugs.map((slug) => trees.find((tree) => tree.slug === slug)).filter(Boolean);

  return (
    <div className="gulf-explorer">
      <div className="country-tabs" role="tablist" aria-label="اختر دولة خليجية">
        {gulfCountries.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={item.id === countryId} onClick={() => setCountryId(item.id)}>{item.label}</button>
        ))}
      </div>
      <div className="country-panel" role="tabpanel" key={countryId}>
        <div className="country-intro">
          <span>دليل محرر يدويًا</span>
          <h3>{country.label}</h3>
          <p>{country.intro}</p>
          {country.source ? <a href={country.source.url} target="_blank" rel="noreferrer">راجع المصدر الإقليمي</a> : <small>اعتماد محافظ على نطاقات Kew الإقليمية؛ وليس قائمة وطنية شاملة.</small>}
        </div>
        <div className="country-trees">
          {selectedTrees.map((tree) => tree ? (
            <Link href={`/trees/${tree.slug}/`} key={tree.slug} className="country-tree">
              <Image src={tree.image} alt="" width={92} height={92} />
              <span><strong>{tree.arabicName}</strong><small dir="ltr" lang="la">{tree.scientificName}</small></span>
            </Link>
          ) : null)}
        </div>
      </div>
    </div>
  );
}
