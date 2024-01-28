import React, { FC, forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { cityList } from "./cities";

type props = React.InputHTMLAttributes<HTMLInputElement> & {
  onLocationSelected: (location: string) => void;
};

const LocationInput = forwardRef<HTMLInputElement, props>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationInput, setLocationInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationInput.trim()) return [];
      const searchWords = locationInput.split(" ");
      return cityList
        .map((city) => `${city.name}, ${city.subcountry}`)
        .filter(
          (city) =>
            city
              .toLocaleLowerCase()
              .startsWith(searchWords[0].toLocaleLowerCase()) &&
            searchWords.every((word) =>
              city.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="Search"
          {...props}
          onChange={(e) => setLocationInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          value={locationInput}
          ref={ref}
        />
        {locationInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationInput("");
                }}
                key={city}
                className="block w-full p-2 text-start"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
