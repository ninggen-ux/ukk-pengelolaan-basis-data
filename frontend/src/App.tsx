import Navbar from "./components/common/Navbar.tsx";
import Footer from "./components/common/Footer.tsx";
import Slider from "./components/common/Slider.tsx";
import Pelanggan from "./pages/Pelanggan.tsx";
import Penjualan from "./pages/Penjualan.tsx";
import Produk from "./pages/Produk.tsx";
import { useState } from "react";

export default function App() {
    const [sliderCount, setSliderCount] = useState<number>(1);

    return (
        <div className="flex h-dvh flex-col justify-between">
            <Navbar />
            {sliderCount === 1 && <Pelanggan />}
            {sliderCount === 2 && <Penjualan />}
            {sliderCount === 3 && <Produk />}
            <Slider sliderCount={sliderCount} setSliderCount={setSliderCount} />
            <Footer />
        </div>
    );
}
