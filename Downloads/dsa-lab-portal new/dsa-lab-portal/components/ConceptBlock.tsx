import { ConceptBlock as ConceptBlockType } from "@/lib/content";

export default function ConceptBlock({ block, index }: { block: ConceptBlockType; index: number }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center text-sm">
        {index + 1}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{block.heading}</h3>
        <p className="text-gray-600 mt-1 leading-relaxed">{block.body}</p>
        {block.analogy && (
          <p className="mt-2 text-sm text-brand-700 bg-brand-50 rounded-lg px-3 py-2 inline-block">
            💡 {block.analogy}
          </p>
        )}
      </div>
    </div>
  );
}
