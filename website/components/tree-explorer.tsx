"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categoryOptions, trees, type TreeCategory } from "@/lib/trees";

export function TreeExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | TreeCategory | null>(null);
  const requested = useSearchParams().get("category");
  const requestedCategory = categoryOptions.some((option) => option.id === requested)
    ? requested as "all" | TreeCategory
    : "all";
  const category = selectedCategory ?? requestedCategory;

  const visibleTrees = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ar");
    return trees.filter((tree) => {
      const matchesCategory = category === "all" || tree.categories.includes(category);
      const matchesQuery = !needle || `${tree.arabicName} ${tree.scientificName}`.toLocaleLowerCase("ar").includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className={`tree-explorer ${compact ? "tree-explorer-compact" : ""}`}>
      <div className="tree-tools">
        <label className="tree-search">
          <span>ابحث بالاسم العربي أو العلمي</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="مثال: السدر أو Ziziphus" />
        </label>
        <div className="filter-pills" aria-label="تصفية الأشجار حسب الفئة">
          {categoryOptions.map((option) => (
            <button key={option.id} type="button" className={category === option.id ? "is-active" : ""} aria-pressed={category === option.id} onClick={() => setSelectedCategory(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count" aria-live="polite">{visibleTrees.length} {visibleTrees.length === 1 ? "نوع" : "أنواع موثقة"}</p>
      <div className="directory-grid">
        {visibleTrees.slice(0, compact ? 6 : undefined).map((tree) => (
          <article className="directory-card reveal" key={tree.slug}>
            <Link className="directory-image" href={`/trees/${tree.slug}/`} aria-label={`اكتشف ${tree.arabicName}`}>
              <Image src={tree.image} alt={tree.imageAlt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" />
              <span className={`origin-badge ${tree.status}`}>{tree.status === "native" ? "أصيل إقليميًا" : "مزروع للزينة"}</span>
            </Link>
            <div className="directory-card-copy">
              <div>
                <h3>{tree.arabicName}</h3>
                <p lang="la" dir="ltr">{tree.scientificName}</p>
              </div>
              <p>{tree.summary}</p>
              <Link className="tree-discover-link" href={`/trees/${tree.slug}/`}>اكتشف الشجرة <span aria-hidden="true">←</span></Link>
            </div>
          </article>
        ))}
      </div>
      {visibleTrees.length === 0 ? <div className="empty-state">لا توجد نتيجة بهذه التصفية. جرّب اسمًا أو فئة أخرى.</div> : null}
      {compact && visibleTrees.length > 6 ? <Link className="button button-secondary explorer-more" href={`/trees/?category=${category}`}>عرض الدليل كاملًا</Link> : null}
    </div>
  );
}
