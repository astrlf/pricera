import clsx from "clsx";
import { Minus, Plus } from "lucide-preact";
import { fmt } from "../format";
import type { Item } from "../items";

interface ItemCardProps {
  item: Item;
  price: number;
  quantity: number;
  onChange: (quantity: number) => void;
}

export function ItemCard({ item, price, quantity, onChange }: ItemCardProps) {
  const set = (n: number) => onChange(Math.max(0, Math.floor(n) || 0));
  const active = quantity > 0

  return (
    <div
      className={clsx(
        "card border bg-base-200 transition-colors",
        active ? "border-primary" : "border-base-300",
      )}
    >
      <div className="card-body items-center gap-2 p-3 text-center">
        <h2 className="text-base font-medium">{item.name}</h2>

        <img
          src={item.src}
          alt=""
          className="size-18.75 object-contain"
          draggable={false}
        />

        <div className="flex w-full items-center rounded-full bg-base-300 p-0.5">
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-md"
            aria-label={`Remove one ${item.name}`}
            tabIndex={-1}
            disabled={!active}
            onClick={() => set(quantity - 1)}
          >
            <Minus className="size-5" />
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            aria-label={`${item.name} quantity`}
            className="min-w-0 flex-1 bg-transparent text-center text-lg font-semibold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            value={quantity}
            onFocus={(e) => e.currentTarget.select()}
            onInput={(e) => set(e.currentTarget.valueAsNumber)}
          />
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-md"
            aria-label={`Add one ${item.name}`}
            tabIndex={-1}
            onClick={() => set(quantity + 1)}
          >
            <Plus className="size-5" />
          </button>
        </div>

        <p
          className={clsx(
            "text-sm tabular-nums",
            active ? "font-semibold text-primary" : "opacity-60",
          )}
        >
          {active ? `= ${fmt(price * quantity)} G$` : `${fmt(price)} G$`}
        </p>
      </div>
    </div>
  );
}
