import { cn } from "cn";

export function PlasmaBlade({
  orientation = "vertical",
  className,
}: {
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  return (
    <div
      className={cn("plasma", orientation === "horizontal" && "horizontal", className)}
      aria-hidden="true"
    >
      <div className="plasma-blade">
        <div className="plasma-core" />
      </div>
      <div className="plasma-hilt">
        <span className="plasma-emitter" />
        <span className="plasma-grip" />
        <span className="plasma-pommel" />
      </div>
    </div>
  );
}
