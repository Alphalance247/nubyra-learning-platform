import { useEffect, useState } from 'react';
import SelectField from './SelectField';

type Props = {
  value: {
    country: string;
    state: string;
  };
  onChange: (value: { country: string; state: string }) => void;
};

type Country = {
  name: string;
  iso2: string;
  long: number;
  lat: number;
};

type State = {
  name: string;
};

type CountriesNowAPIResponse<T> = {
  error: boolean;
  msg: string;
  data: T;
};

type CountryOption = {
  label: string;
  value: string;
};

const CountryStateSelect: React.FC<Props> = ({ value, onChange }) => {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [states, setStates] = useState<CountryOption[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
      const data: CountriesNowAPIResponse<Country[]> = await res.json();

      const options: CountryOption[] = data.data.map((country) => ({
        label: country.name,
        value: country.name,
      }));

      setCountries([{ label: 'Select', value: '' }, ...options]);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!value.country) return;

      const res = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: value.country }),
      });

      const data: CountriesNowAPIResponse<{ name: string; states: State[] }> = await res.json();

      const options: CountryOption[] = data.data.states.map((state) => ({
        label: state.name,
        value: state.name,
      }));

      setStates([{ label: 'Select', value: '' }, ...options]);
    };

    fetchStates();
  }, [value.country]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ country: e.target.value, state: '' });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, state: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
        <SelectField
          label="Country"
          name="country"
          value={value.country}
          onChange={handleCountryChange}
          required
          options={countries}
          className="w-full"
        />
      

        <SelectField
          label="State"
          name="state"
          value={value.state}
          onChange={handleStateChange}
          required
          options={states}
          className="w-full"
        />
      
    </div>

  );
};

export default CountryStateSelect;
