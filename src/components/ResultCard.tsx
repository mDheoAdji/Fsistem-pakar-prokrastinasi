interface Props {
  level: string;
  reason: string;
  sources: string[];
}

export default function ResultCard({
  level,
  reason,
  sources,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Hasil Diagnosa
      </h2>

      <div className="bg-red-100 text-red-700 p-3 rounded">
        {level}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">
          Alasan
        </h3>

        <p>{reason}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">
          Referensi
        </h3>

        <ul className="list-disc pl-5">
          {sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}