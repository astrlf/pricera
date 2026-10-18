import { fmt } from "../format";

interface TotalProps {
  gralats: number;
  trochus: number;
  tradeable: boolean;
  onReset: () => void;
}

export const Total = ({ gralats, trochus, tradeable, onReset }: TotalProps) => (
  <footer className="flex items-center justify-between gap-5 border-t border-base-300 bg-base-100 px-5 py-4">
    <div className="tabular-nums">
      <p className="text-xl font-semibold">{fmt(gralats)} G$</p>
      <p className="text-base opacity-60">
        {tradeable ? `${fmt(trochus)} Trochus` : "Not tradeable for Trochus"}
      </p>
    </div>
    <button
      type="button"
      className="btn btn-ghost btn-md"
      disabled={gralats === 0}
      onClick={onReset}
    >
      Reset
    </button>
  </footer>
);
