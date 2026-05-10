import { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2, Loader2, MapPin, Search, XCircle } from 'lucide-react';
import { searchLocations } from '../utils/mapDirections.js';

export default function LocationSearchField({
  id,
  label,
  icon: Icon,
  markerColor,
  placeholder,
  value,
  selectedPlace,
  onTextChange,
  onPlaceSelect,
}) {
  const helperId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const blurTimer = useRef(null);
  const exactSelection = selectedPlace && value === selectedPlace.label;

  useEffect(() => {
    if (!isFocused || value.trim().length < 3 || exactSelection) {
      setSuggestions([]);
      setStatus('idle');
      setError('');
      return undefined;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setStatus('loading');
      setError('');

      try {
        const results = await searchLocations(value, 6, controller.signal);
        setSuggestions(results);
        setStatus(results.length ? 'success' : 'empty');
      } catch (searchError) {
        if (searchError.name !== 'AbortError') {
          setSuggestions([]);
          setStatus('error');
          setError(searchError.message || 'Unable to search locations.');
        }
      }
    }, 380);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [exactSelection, isFocused, value]);

  const handleBlur = () => {
    blurTimer.current = window.setTimeout(() => setIsFocused(false), 140);
  };

  const handleFocus = () => {
    if (blurTimer.current) {
      window.clearTimeout(blurTimer.current);
    }
    setIsFocused(true);
  };

  const selectPlace = (place) => {
    onPlaceSelect(place);
    setSuggestions([]);
    setStatus('idle');
    setError('');
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm font-bold text-[#344054]">
        <Icon aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
        {label}
      </label>
      <div className="field-shell">
        <MapPin aria-hidden="true" className="h-5 w-5 shrink-0" style={{ color: markerColor }} />
        <input
          id={id}
          className="field-control"
          value={value}
          onBlur={handleBlur}
          onChange={(event) => onTextChange(event.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          aria-describedby={helperId}
          autoComplete="off"
        />
        {status === 'loading' ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin text-[#155eef]" />
        ) : exactSelection ? (
          <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#00a878]" />
        ) : (
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#7d8a9a]" />
        )}
      </div>

      <p id={helperId} className="mt-1.5 text-xs font-semibold text-[#667085]">
        {exactSelection
          ? `Exact point selected: ${selectedPlace.address}`
          : 'Search and select a suggestion for accurate global routing.'}
      </p>

      {isFocused && (suggestions.length > 0 || status === 'empty' || status === 'error') ? (
        <div className="location-results absolute z-[700] mt-2 max-h-72 w-full overflow-y-auto rounded-[8px] border border-[#dfe7f1] bg-white p-2 shadow-xl">
          {suggestions.map((place) => (
            <button
              type="button"
              key={`${place.osmType}-${place.osmId}-${place.lat}-${place.lng}`}
              className="flex w-full gap-3 rounded-[8px] px-3 py-2 text-left transition hover:bg-[#eef4ff]"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectPlace(place)}
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-[#eef4ff] text-[#155eef]">
                <MapPin aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-[#101828]">{place.label}</span>
                <span className="mt-0.5 block line-clamp-2 text-xs font-semibold leading-5 text-[#667085]">
                  {place.address}
                </span>
              </span>
            </button>
          ))}

          {status === 'empty' ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#667085]">
              <XCircle aria-hidden="true" className="h-4 w-4 text-[#ef4444]" />
              No matching location found. Try a more specific address.
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#b42318]">
              <XCircle aria-hidden="true" className="h-4 w-4" />
              {error}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
