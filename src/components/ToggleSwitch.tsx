interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  label?: string; // optional text
}

const ToggleSwitch = ({ checked, onChange, id, label }: ToggleSwitchProps) => (
  <label htmlFor={id} className="inline-flex items-center cursor-pointer">
    <input
      id={id}
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div
      className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
                 peer-checked:after:translate-x-full 
                 after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                 after:bg-white after:border-gray-300 after:border after:rounded-full 
                 after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                 peer-checked:bg-blue-600"
    ></div>
    {label && <span className="ml-2 text-sm text-gray-600">{label}</span>}
  </label>
);

export default ToggleSwitch;
