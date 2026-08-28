'use client';

import React, { useState } from 'react';

interface CategorySeoBlockProps {
  title?: string;
  contentHtml: string;
  lang: string;
}

export default function CategorySeoBlock({ title, contentHtml, lang }: CategorySeoBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEn = lang === 'en';

  return (
    <div className="seo-block" style={{ marginTop: '3.5rem' }}>
      {title && <h2>{title}</h2>}
      <div className={`seo-expandable-content ${!isExpanded ? 'collapsed' : 'expanded'}`}>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        {!isExpanded && <div className="seo-fade-overlay" />}
      </div>
      <div className="seo-toggle-wrapper">
        <button
          type="button"
          className="seo-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded
            ? (isEn ? 'Show Less ▲' : 'Lees Minder ▲')
            : (isEn ? 'Read More ▼' : 'Lees Meer ▼')}
        </button>
      </div>
    </div>
  );
}
