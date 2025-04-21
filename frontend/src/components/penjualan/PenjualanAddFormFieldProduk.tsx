import { Dispatch, SetStateAction, MouseEvent } from "react";

interface Props {
    setPenjualanFormData: Dispatch<
        SetStateAction<{
            produk: string;
            jumlahProduk: number;
            hargaPerProduk: number;
            subTotal: number;
        }>
    >;
    namaProduk: string;
    harga: number;
}

export default function PenjualanAddFormFieldProduk(props: Props) {
    return (
        <button
            className="cursor-pointer rounded-sm p-2 shadow hover:bg-blue-600 hover:text-white"
            value={props.namaProduk}
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                const { value } = e.target as HTMLButtonElement;
                props.setPenjualanFormData((prevState) => {
                    return {
                        ...prevState,
                        produk: value,
                        hargaPerProduk: props.harga,
                    };
                });
            }}
        >
            {props.namaProduk}
        </button>
    );
}
