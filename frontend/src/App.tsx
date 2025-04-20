import Navbar from "./components/common/Navbar.tsx";
import Pelanggan from "./pages/Pelanggan.tsx";
import Footer from "./components/common/Footer.tsx";

export default function App() {
    return (
        <div className="flex h-dvh flex-col justify-between">
            <Navbar />
            <Pelanggan />
            <Footer />
        </div>
    );
}
