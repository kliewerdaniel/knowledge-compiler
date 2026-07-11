import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  count?: number;
  type?: "card" | "text" | "avatar" | "circle" | "rect";
}

export function Skeleton({
  className = "",
  count = 1,
  type = "text",
}: SkeletonProps) {
  const heightClasses: Record<string, string> = {
    card: "h-32",
    text: "h-4",
    avatar: "h-10 w-10",
    circle: "h-12 w-12 rounded-full",
    rect: "h-20",
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "skeleton",
              heightClasses[type] || "h-4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "skeleton",
        heightClasses[type] || "h-4",
        className
      )}
    />
  );
}
