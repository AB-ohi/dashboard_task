import Navbar from "@/Component/Navbar/Navbar";
import Link from "next/link";
import { ArrowRight} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
       <div className="text-center mb-16">
            <Link href="/dashboard/leads">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                Go to Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
          </div>

    </>
  );
}