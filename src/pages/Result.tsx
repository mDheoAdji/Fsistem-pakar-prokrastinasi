import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, symptoms } =
    location.state || {};

  if (!result) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">
          Data diagnosa tidak ditemukan
        </h2>

        <button
          onClick={() =>
            navigate("/diagnosis")
          }
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  const getLevelColor = (
    name?: string
  ) => {
    if (
      name?.toLowerCase().includes("rendah")
    ) {
      return "bg-green-100 text-green-700";
    }

    if (
      name?.toLowerCase().includes("sedang")
    ) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          🧠 Hasil Diagnosa
        </h1>

        <div
          className={`p-4 rounded-lg text-center text-xl font-bold mb-6 ${getLevelColor(
            result.diagnosis?.name
          )}`}
        >
          {result.diagnosis?.name}
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            📖 Deskripsi
          </h3>

          <p className="mt-2">
            {result.diagnosis?.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            📋 Gejala yang Dipilih
          </h3>

          <ul className="list-disc pl-5 mt-2">
            {result.selectedSymptoms?.map(
              (id: string) => {
                const symptom =
                  symptoms.find(
                    (s: any) =>
                      s.id === id
                  );

                return (
                  <li key={id}>
                    {id} -{" "}
                    {symptom?.name}
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            ⚙ Rule Aktif
          </h3>

          <p>{result.activeRule}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            🔄 Proses Inferensi
          </h3>

          <div className="p-4 bg-blue-50 rounded-lg text-center mt-2">

            <p>
              {result.selectedSymptoms?.join(
                " + "
              )}
            </p>

            <p className="my-2">
              ↓
            </p>

            <p>
              {result.activeRule}
            </p>

            <p className="my-2">
              ↓
            </p>

            <p>
              {result.diagnosis?.id}
            </p>

            <p className="my-2">
              ↓
            </p>

            <p className="font-bold">
              {
                result.diagnosis
                  ?.name
              }
            </p>

          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            📝 Penjelasan
          </h3>

          <p>{result.reason}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            📚 Referensi Jurnal
          </h3>

          <ul className="list-disc pl-5 mt-2">
            {result.source?.map(
              (item: string) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg">
            💡 Saran
          </h3>

          <ul className="list-disc pl-5 mt-2">
            {result.diagnosis?.suggestion?.map(
              (item: string) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex gap-3 mt-8">

          <button
            onClick={() =>
              navigate("/diagnosis")
            }
            className="
              bg-gray-500
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-gray-600
            "
          >
            ← Kembali
          </button>

        </div>

      </div>

    </div>
  );
}