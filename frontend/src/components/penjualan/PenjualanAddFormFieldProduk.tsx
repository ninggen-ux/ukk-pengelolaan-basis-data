import { Dispatch, SetStateAction, MouseEvent } from "react";

interface Props {
    setPenjualanFormData: Dispatch<
        SetStateAction<{
            produk: string;
            produkId: string;
            jumlahProduk: number;
            hargaPerProduk: number;
            subTotal: number;
        }>
    >;
    id: string;
    namaProduk: string;
    harga: number;
}

export default function PenjualanAddFormFieldProduk(props: Props) {
    return (
        <button
            className="cursor-pointer rounded-sm p-2 shadow hover:bg-blue-600 hover:text-white"
            value={props.id}
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                const { value } = e.target as HTMLButtonElement;
                props.setPenjualanFormData((prevState) => {
                    return {
                        ...prevState,
                        produk: props.namaProduk,
                        produkId: value,
                        hargaPerProduk: props.harga,
                    };
                });
            }}
        >
            {props.namaProduk}
        </button>
    );
}
