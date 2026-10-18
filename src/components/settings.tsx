import { useState } from "preact/hooks";
import { parseNumber } from "../format";
import { DiscordInvite } from "./discord-invite";

interface SettingsProps {
  ratio: number;
  onRatio: (n: number) => void;
  perTab: boolean;
  onPerTab: (v: boolean) => void;
}

export function Settings({ ratio, onRatio, perTab, onPerTab }: SettingsProps) {
  const [ratioText, setRatioText] = useState(String(ratio));

  return (
    <div className="flex max-w-2xl flex-col gap-7 p-5 text-lg">
      <label className="flex flex-col gap-1.5">
        <span className="flex items-center justify-between">
          Per-tab totals
          <input
            type="checkbox"
            className="toggle toggle-lg"
            checked={perTab}
            onChange={(e) => onPerTab(e.currentTarget.checked)}
          />
        </span>
        <span className="text-sm opacity-60">
          When on, each tab shows only its own totals. Otherwise totals are
          combined across every tab.
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        Trochus ratio
        <input
          type="text"
          inputMode="decimal"
          className="input input-lg w-full"
          value={ratioText}
          onInput={(e) => {
            const text = e.currentTarget.value;
            setRatioText(text);
            const parsed = parseNumber(text);
            if (Number.isFinite(parsed) && parsed >= 0) onRatio(parsed);
          }}
          onBlur={() => setRatioText(String(ratio))}
        />
        <span className="text-sm opacity-60">
          Mind the exchange rate during events, especially double jobs.
        </span>
      </label>

      <div>
        <h1>Giveaways</h1>
        <p className="mb-4 text-base opacity-60">
          Looking to win some trochus, find a Crypt gang, or win supers? join{" "}
          <a href="https://www.youtube.com/@TheGraalian" className="link">
            The Graalian's
          </a>{" "}
          server on Discord, with giveaways hosted frequently and more than +20m
          G$ being given away on Christmas!
        </p>

        <DiscordInvite
          href="https://discord.gg/FE2ZtuvSyM"
          text="Join The Graalian's Server"
        />
      </div>

      <div class="divider py-0! my-0!"></div>

      <footer className="flex flex-col gap-3 text-sm opacity-60 ">
        <p>
          All game assets and related intellectual property are owned by their
          respective copyright holders, including Toonslab and the original
          creators of GraalOnline Era. This project does not claim ownership of
          any third-party assets.
        </p>
        <p>
          Pricera is made by @matroska_container_format using{" "}
          <a className="link" href="https://daisyui.com/">
            DaisyUI
          </a>{" "}
          and{" "}
          <a className="link" href="https://preactjs.com/">
            Preact
          </a>
          . <br />
          For any complaints, bug reports, or feature requests, DM me on
          Discord.
        </p>
      </footer>
    </div>
  );
}
