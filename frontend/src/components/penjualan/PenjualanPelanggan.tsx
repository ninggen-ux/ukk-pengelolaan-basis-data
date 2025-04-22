import { Dispatch, SetStateAction, MouseEvent } from "react";

interface AllPenjualanFormData {
    produk: string;
    jumlahProduk: number;
    hargaPerProduk: number;
    subTotal: number;
}

interface AllPenjualanFormDataWithUser {
    pelanggan: string;
    pelangganId: string;
    data: AllPenjualanFormData[];
}

interface Props {
    id: string;
    pelanggan: string;
    setAllPenjualanFormData: Dispatch<
        SetStateAction<AllPenjualanFormDataWithUser>
    >;
}

export default function PenjualanPelanggan({
    id,
    pelanggan,
    setAllPenjualanFormData,
}: Props) {
    return (
        <button
            className="cursor-pointer rounded-sm p-2 shadow hover:bg-blue-600 hover:text-white"
            value={id}
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                const { value } = e.target as HTMLButtonElement;
                setAllPenjualanFormData((prevState) => {
                    return {
                        ...prevState,
                        pelangganId: value,
                        pelanggan: pelanggan,
                    };
                });
            }}
        >
            {pelanggan}
        </button>
    );
}
