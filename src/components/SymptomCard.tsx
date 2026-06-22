interface Props {
  id: string;
  name: string;
  checked: boolean;
  onChange: (id: string) => void;
}

export default function SymptomCard({
  id,
  name,
  checked,
  onChange,
}: Props) {
  return (
    <label
      className="
      flex
      items-center
      gap-3
      p-4
      border
      rounded-lg
      hover:bg-gray-50
      cursor-pointer
      transition
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
      />

      <span>{name}</span>
    </label>
  );
}