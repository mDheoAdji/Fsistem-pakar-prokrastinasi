import { useEffect, useState } from "react";
import Header from "../components/Header";
import SymptomCard from "../components/SymptomCard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import type { Symptom } from "../types/symptom";



export default function Diagnosis() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] =
    useState<string[]>([]);



  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response =
          await api.get<Symptom[]>("/symptoms");

        setSymptoms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleChange = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length < 3) {
      alert(
        `Anda baru memilih ${selectedSymptoms.length} gejala.\nMinimal 3 gejala diperlukan untuk melakukan diagnosa.`
      );
      return;
    }

    try {
      const response = await api.post(
        "/diagnosis",
        {
          symptoms: selectedSymptoms,
        }
      );

      navigate("/result", {
        state: {
          result: response.data,
          symptoms,
        },
      });
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat melakukan diagnosa."
      );
    }
  };



  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-8">

        {/* Form Diagnosa */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-3xl font-bold mb-2">
            Konsultasi Prokrastinasi Akademik
          </h2>

          <p className="text-gray-600 mb-6">
            Pilih gejala yang sesuai dengan kondisi
            yang Anda alami saat ini.
          </p>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p>
              Gejala dipilih :
              <strong>
                {" "}
                {selectedSymptoms.length}
              </strong>
              {" "} / {symptoms.length}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Minimal 3 gejala diperlukan untuk
              melakukan diagnosa.
            </p>
          </div>

          <div className="space-y-3">
            {symptoms.map((symptom) => (
              <SymptomCard
                key={symptom.id}
                id={symptom.id}
                name={symptom.name}
                checked={selectedSymptoms.includes(
                  symptom.id
                )}
                onChange={handleChange}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              selectedSymptoms.length < 3
            }
            className={`
              w-full
              mt-6
              py-3
              rounded-lg
              font-semibold
              transition

              ${selectedSymptoms.length < 3
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            Diagnosa Sekarang
          </button>

        </div>

      </div>
    </>
  );
}