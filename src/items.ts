import * as fish from "./assets/fish";
import * as minerals from "./assets/minerals";
import * as mushrooms from "./assets/mushrooms";
import * as shells from "./assets/shells";
import * as trash from "./assets/trash";

export const DEFAULT_RATIO = 5;
export const TROCHUS_ID = "shells:Trochus";

export const CATEGORIES = [
  "fish",
  "trash",
  "shells",
  "minerals",
  "mushrooms",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Item {
  id: string;
  src: string;
  name: string;
  price: number;
  category: Category;
}

export const isTradeable = (item: Item) => item.category !== "fish";

const build = (
  category: Category,
  rows: [name: string, price: number, src: string][],
): Item[] =>
  rows.map(([name, price, src]) => ({
    id: `${category}:${name}`,
    src,
    name,
    price,
    category,
  }));

export const CATALOG: Record<Category, Item[]> = {
  fish: build("fish", [
    ["Tadpole", 4, fish.Tadpole],
    ["Bass", 5, fish.Bass],
    ["Dab", 6, fish.Dab],
    ["Black Bass", 7, fish.Blackbass],
    ["Yellow Perch", 9, fish.Yellowperch],
    ["Bluegill", 10, fish.Bluegill],
    ["Clown", 12, fish.Clown],
    ["Angel", 13, fish.Angel],
    ["Blue Snapper", 14, fish.Bluesnapper],
    ["Red Snapper", 15, fish.Redsnapper],
    ["Tuna", 16, fish.Tuna],
    ["Noob", 25, fish.Noob],
    ["Bone", 30, fish.Bones],
    ["Eel", 40, fish.Eel],
  ]),
  trash: build("trash", [
    ["Bottle", 5, trash.Bottle],
    ["Newspaper", 4, trash.Newspaper],
    ["Tire", 6, trash.Tire],
    ["Paper", 4, trash.Paper],
  ]),
  shells: build("shells", [
    ["Sand Dollar", 5, shells.Sanddollar],
    ["Scallop", 5, shells.Scallop],
    ["Aerolata", 3, shells.Aerolata],
    ["Trochus", 3, shells.Trochus],
    ["Starfish", 7, shells.Starfish],
    ["Crabshell Black", 6, shells.CrabshellBlack],
    ["Crabshell Blue", 6, shells.CrabshellBlue],
    ["Crabshell Green", 6, shells.CrabshellGreen],
    ["Crabshell Red", 6, shells.CrabshellRed],
    ["Crabshell Yellow", 6, shells.CrabshellYellow],
  ]),
  minerals: build("minerals", [
    ["Iron", 5, minerals.Iron],
    ["Lead", 5, minerals.Lead],
    ["Silver", 5, minerals.Silver],
    ["Copper", 5, minerals.Copper],
    ["Quartz", 5, minerals.Quartz],
    ["Gypsum", 5, minerals.Gypsum],
    ["Gold", 10, minerals.Gold],
    ["Diamond", 10, minerals.Diamond],
    ["Emerald", 8, minerals.Emerald],
    ["Ruby", 7, minerals.Ruby],
    ["Sapphire", 7, minerals.Sapphire],
  ]),
  mushrooms: build("mushrooms", [
    ["Plain", 5, mushrooms.MushroomPlain],
    ["Purple", 5, mushrooms.MushroomPurple],
    ["Red", 5, mushrooms.MushroomRed],
    ["Yellow", 5, mushrooms.MushroomYellow],
  ]),
};

export const ALL_ITEMS = CATEGORIES.flatMap((c) => CATALOG[c]);
