"use client";

import { useState } from "react";
import { sampleAnnouncements, sampleMember } from "@/content/preview";
import { AnnouncementList, AnnouncementsEmpty, AnnouncementsHeading } from "./announcements";
import { PreviewBar } from "./preview-bar";
import { Segmented } from "./segmented";

type View = "sample" | "empty";

// Design preview of the member dashboard with sample announcements and an empty state.
export function DashboardPreview() {
  const [view, setView] = useState<View>("sample");
  const items = view === "sample" ? sampleAnnouncements.slice(0, 3) : [];

  return (
    <>
      <PreviewBar note="sample data">
        <Segmented
          label="Announcements"
          options={[
            { value: "sample", label: "Sample" },
            { value: "empty", label: "Empty" },
          ]}
          value={view}
          onChange={setView}
        />
      </PreviewBar>

      <main id="main" className="px-gutter pb-20 pt-7 md:pt-12">
        <div className="max-w-[56rem]">
          <section aria-labelledby="ann-title">
            <AnnouncementsHeading meta={items.length ? `${items.length} updates · sample content` : "No updates yet"} />
            {items.length ? <AnnouncementList items={items} /> : <AnnouncementsEmpty />}
          </section>
          <p className="mt-10 text-[0.875rem] text-ink-soft">
            Signed in as <span className="font-medium text-ink">{sampleMember.email}</span> (sample account)
          </p>
        </div>
      </main>
    </>
  );
}
