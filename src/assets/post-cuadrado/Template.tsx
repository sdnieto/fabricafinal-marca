import { PostStoryShell } from "../../components/shared/PostStoryShell";
import type { PiezaGraficaContent } from "../../types/content";

export function PostCuadradoTemplate({ content }: { content: PiezaGraficaContent }) {
  return (
    <PostStoryShell
      format="post"
      variant={content.imageDataUrl ? "imagen" : "novedad"}
      logoStyle={content.logoStyle}
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
      imageDataUrl={content.imageDataUrl}
      titleSize={content.titleSize}
    />
  );
}
