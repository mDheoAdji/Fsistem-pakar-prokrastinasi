import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Sistem Pakar Deteksi Tingkat
          Prokrastinasi Akademik
        </h2>

        <p className="text-gray-600 mb-8">
          Sistem ini membantu mengidentifikasi
          tingkat prokrastinasi akademik mahasiswa
          menggunakan metode Forward Chaining.
        </p>

        <button
          onClick={() => navigate("/diagnosis")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Mulai Diagnosa
        </button>
      </div>
    </>
  );
}