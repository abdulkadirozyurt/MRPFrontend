import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CheckCircleFilled } from "@ant-design/icons";
import { resetRegistrationState } from "@/utilities/redux/slices/authSlice";

export default function DoneRegister() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigateAndRoute = () => {
    dispatch(resetRegistrationState());
    router.push("/login");
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-100">

    // </div>

    <div className="max-w-md w-full bg-white p-6 ">
      <div className="text-center">
        <CheckCircleFilled style={{ fontSize: "4.5rem", color: "#52C41A" }} />
        <h1 className="text-3xl font-bold mt-4">Kayıt Başarılı!</h1>
        <p className="text-lg mt-2 mb-6">
          Kayıt işleminiz başarıyla tamamlandı. Şimdi giriş yapabilirsiniz.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleNavigateAndRoute}
        >
          Giriş Sayfasına Dön
        </button>
      </div>
     
    </div>
  );
}
