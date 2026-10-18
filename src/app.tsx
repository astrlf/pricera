import clsx from "clsx";
import {
  Diamond,
  Fish,
  Leaf,
  type LucideIcon,
  PanelLeftOpen,
  Settings2,
  Trash2,
  Waves,
} from "lucide-preact";
import { useState } from "preact/hooks";
import { ItemCard } from "./components/item-card";
import { Settings } from "./components/settings";
import { Total } from "./components/total";
import {
  ALL_ITEMS,
  CATALOG,
  type Category,
  DEFAULT_RATIO,
  type Item,
  isTradeable,
  TROCHUS_ID,
} from "./items";
import { useStored } from "./storage";

type Tab = Category | "settings";

const TABS: { id: Tab; label: string; Icon: LucideIcon }[] = [
  { id: "fish", label: "Fish", Icon: Fish },
  { id: "trash", label: "Trash", Icon: Trash2 },
  { id: "shells", label: "Shells", Icon: Waves },
  { id: "minerals", label: "Minerals", Icon: Diamond },
  { id: "mushrooms", label: "Mushrooms", Icon: Leaf },
  { id: "settings", label: "Settings", Icon: Settings2 },
];

export function App() {
  const [tab, setTab] = useState<Tab>("fish");
  const [quantities, setQuantities] = useStored<Record<string, number>>(
    "quantities",
    {},
  );
  const [ratio, setRatio] = useStored("ratio", DEFAULT_RATIO);
  const [perTab, setPerTab] = useStored("perTab", true);

  const category = tab === "settings" ? null : tab;
  const items = category ? CATALOG[category] : [];
  const label = TABS.find(({ id }) => id === tab)?.label ?? "";

  const priceOf = (item: Item) => (item.id === TROCHUS_ID ? ratio : item.price);
  const quantityOf = (item: Item) => quantities[item.id] ?? 0;
  const total = (list: Item[]) =>
    list.reduce((sum, i) => sum + priceOf(i) * quantityOf(i), 0);

  const setQuantity = (id: string, quantity: number) =>
    setQuantities((prev) => {
      const next = { ...prev };
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });

  const resetItems = (list: Item[]) =>
    setQuantities((prev) => {
      const next = { ...prev };
      for (const { id } of list) delete next[id];
      return next;
    });

  const scope = perTab && category ? items : ALL_ITEMS;
  const gralats = total(scope);
  const tradeable = scope.some(isTradeable);
  const trochus = ratio === 0 ? 0 : total(scope.filter(isTradeable)) / ratio;

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex h-dvh flex-col">
        <nav className="navbar min-h-18 w-full bg-base-300 px-3">
          <label
            htmlFor="sidebar"
            aria-label="Toggle sidebar"
            className="btn btn-square btn-ghost btn-lg drawer-button"
          >
            <PanelLeftOpen className="my-1.5 inline-block size-5" />
          </label>
          <h1 className="px-3 text-xl font-medium">{label}</h1>
        </nav>

        <main className="flex-1 overflow-y-auto bg-base-100">
          {category ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 p-5">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  price={priceOf(item)}
                  quantity={quantityOf(item)}
                  onChange={(q) => setQuantity(item.id, q)}
                />
              ))}
            </div>
          ) : (
            <Settings
              ratio={ratio}
              onRatio={setRatio}
              perTab={perTab}
              onPerTab={setPerTab}
            />
          )}
        </main>

        {category && (
          <Total
            gralats={gralats}
            trochus={trochus}
            tradeable={tradeable}
            onReset={() => resetItems(scope)}
          />
        )}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="sidebar"
          aria-label="Close sidebar"
          className="drawer-overlay"
        />

        <div className="flex min-h-full flex-col items-start bg-base-200 transition-[width] duration-200 is-drawer-close:w-18 is-drawer-open:w-72">
          <ul className="menu menu-lg w-full grow gap-2 whitespace-nowrap">
            {TABS.map(({ id, label: name, Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={clsx(
                    "is-drawer-close:tooltip is-drawer-close:tooltip-right h-14 content-center px-4.5",
                    id === tab && "menu-active",
                  )}
                  data-tip={name}
                  aria-current={id === tab ? "page" : undefined}
                  onClick={() => setTab(id)}
                >
                  <Icon className="my-1.5 inline-block size-5" />
                  <span className="is-drawer-close:hidden">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
