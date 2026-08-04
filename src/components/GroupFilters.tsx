import { GROUP_LABELS, useFilters } from '../context/FilterContext';
import type { GroupKey } from '../types';

const GROUP_DOT: Record<GroupKey, string> = {
  people: 'bg-orange-400',
  places: 'bg-teal-300',
  stories: 'bg-violet-400',
  theory: 'bg-sky-400',
};

/** Checkbox toggles isolating people, places, story-figures and theory. */
export default function GroupFilters() {
  const { enabledGroups, toggleGroup } = useFilters();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {(Object.keys(GROUP_LABELS) as GroupKey[]).map((g) => (
        <label
          key={g}
          className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none hover:text-slate-100"
        >
          <input
            type="checkbox"
            checked={enabledGroups[g]}
            onChange={() => toggleGroup(g)}
            className="accent-orange-500 w-3.5 h-3.5"
          />
          <span className={`inline-block w-2 h-2 rounded-full ${GROUP_DOT[g]}`} />
          {GROUP_LABELS[g]}
        </label>
      ))}
    </div>
  );
}
