import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faRupiahSign,
    faBox,
    faAngleDown,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PenjualanItemDetail from "./PenjualanItemDetail.tsx";

interface DetailPenjualan {
    id: string;
    jumlahProduk: number;
    produk: string;
    subTotal: string;
}
interface Props {
    pelanggan: string;
    tanggalPenjualan: string;
    totalHarga: string;
    detailPenjualan: DetailPenjualan[];
}

export default function PenjualanItem({
    pelanggan,
    tanggalPenjualan,
    totalHarga,
    detailPenjualan,
}: Props) {
    const [detailProduk, setDetailProduk] = useState<boolean>(false);

    const penjualanItemDetailMap = detailPenjualan.map((item) => {
        return (
            <PenjualanItemDetail
                key={item.id}
                jumlahProduk={item.jumlahProduk}
                produk={item.produk}
                subTotal={item.subTotal}
            />
        );
    });

    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faUser} />
                <p>{pelanggan}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faCalendar} />
                <p>{tanggalPenjualan}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faRupiahSign} />
                <p>{totalHarga}</p>
            </div>
            <div className="relative flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faBox} />
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                        setDetailProduk((prevState) => {
                            return !prevState;
                        });
                    }}
                >
                    Detail Produk{" "}
                    <FontAwesomeIcon
                        className={detailProduk ? "rotate-180" : "rotate-0"}
                        icon={faAngleDown}
                    />
                </button>
                <div
                    className={`${detailProduk ? "flex" : "hidden"} absolute top-8 left-0 z-10 max-h-80 flex-col overflow-auto rounded-sm bg-white p-2 shadow`}
                >
                    {penjualanItemDetailMap}
                </div>
            </div>
        </div>
    );
}
