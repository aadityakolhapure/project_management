import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import Link from "next/link";

export function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          Brainwave AI <span className="text-violet-600">2.0</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Smart Data Capture with{" "}
          <span className="text-violet-600">Chrome Extension</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <p>
            -&gt; Seamlessly capture and organize insights from{" "}
            <span className="font-semibold text-violet-600">articles</span>,{" "}
            <span className="font-semibold text-violet-600">tweets</span>,{" "}
            <span className="font-semibold text-violet-600">bookmarks</span>,
            and{" "}
            <span className="font-semibold text-violet-600">web content</span>.{" "}
            <br />
            -&gt; Save highlights, take notes, and categorize information
            instantly. <br />
            -&gt; Sync captured data with{" "}
            {/* <span className="font-semibold text-violet-600">Notion</span>,{" "}
            <span className="font-semibold text-violet-600">Google Drive</span>, */}
            and{" "}
            <span className="font-semibold text-violet-600">
              Brainwave AI Workspace
            </span>
            .
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Link href="https://localhost:1111" target="_blank">
        <Button className="mt-[1.6rem] bg-violet-600">Explore</Button>
        </Link>
      </BoxReveal>
    </div>
  );
}
