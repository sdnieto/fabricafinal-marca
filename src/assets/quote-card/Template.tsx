import { PostStoryShell } from "../../components/shared/PostStoryShell";
import type { QuoteCardContent } from "../../types/content";

export function QuoteCardTemplate({ content }: { content: QuoteCardContent }) {
  return (
    <PostStoryShell
      format="post"
      variant="cita"
      logoStyle={content.logoStyle}
      quoteText={content.quoteText}
      quoteAuthor={content.author}
      titleSize={content.titleSize}
    />
  );
}
