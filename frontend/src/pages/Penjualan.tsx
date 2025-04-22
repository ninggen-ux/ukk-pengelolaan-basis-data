import PenjualanItem from "../components/penjualan/PenjualanItem";
import PenjualanAddFormField from "../components/penjualan/PenjualanAddFormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCheck,
    faXmark,
    faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default function Penjualan() {
    interface AllPenjualanFormData {
        produk: string;
        jumlahProduk: number;
        hargaPerProduk: number;
        subTotal: number;
    }

    interface DetailPenjualan {
        id: string;
        jumlahProduk: number;
        produk: string;
        subTotal: string;
    }

    interface PenjualanData {
        id: string;
        pelanggan: string;
        tanggalPenjualan: string;
        totalHarga: string;
        detailPenjualan: DetailPenjualan[];
    }

    const [isAdd, setIsAdd] = useState<number>(0);

    const [allPenjualanFormData, setAllPenjualanFormData] = useState<
        AllPenjualanFormData[]
    >([]);

    const [penjualanData, setPenjualanData] = useState<PenjualanData[]>([]);

    console.log(allPenjualanFormData);

    async function onSubmitForm() {
        try {
            setIsAdd(0);

            Swal.fire({
                icon: "success",
                text: "Semua data sudah benar!!!",
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                Swal.fire({
                    icon: "error",
                    text: err.message,
                });
                console.error(err);
            }
        }
    }

    const penjualanAddFormFieldMap = Array.from({ length: isAdd }).map(
        (_, index) => {
            return (
                <PenjualanAddFormField
                    key={index}
                    id={index}
                    setAllPenjualanFormData={setAllPenjualanFormData}
                />
            );
        },
    );

    useEffect(() => {
        async function getPenjualan() {
            try {
                const response = await fetch("http://localhost:3000/penjualan");

                const responseJson = await response.json();

                setPenjualanData(responseJson.data);
            } catch (err) {
                console.error(err);
            }
        }

        getPenjualan();
    }, []);

    const penjualanItemMap = penjualanData.map((item) => {
        return (
            <PenjualanItem
                key={item.id}
                pelanggan={item.pelanggan}
                tanggalPenjualan={item.tanggalPenjualan}
                totalHarga={item.totalHarga}
                detailPenjualan={item.detailPenjualan}
            />
        );
    });

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-4xl font-medium uppercase">Penjualan</h1>
            <div className="flex w-10/12 flex-col gap-2">
                <div className="flex w-full justify-end gap-2">
                    {isAdd > 0 ? (
                        <>
                            <button
                                className="cursor-pointer"
                                onClick={onSubmitForm}
                            >
                                <FontAwesomeIcon
                                    className="aspect-[1/1] rounded-sm bg-green-500 p-2 text-white"
                                    icon={faCheck}
                                />
                            </button>
                            <button
                                className="cursor-pointer"
                                onClick={() => setIsAdd(0)}
                            >
                                <FontAwesomeIcon
                                    className="aspect-[1/1] rounded-sm bg-red-500 p-2 text-white"
                                    icon={faXmark}
                                />
                            </button>
                        </>
                    ) : (
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsAdd(1)}
                        >
                            <FontAwesomeIcon
                                className="aspect-[1/1] rounded-sm bg-green-500 p-2 text-white"
                                icon={faPlus}
                            />
                        </button>
                    )}
                </div>
                <div className="flex max-h-[60dvh] flex-col gap-4 overflow-y-auto">
                    {isAdd > 0 && (
                        <form className="flex flex-col gap-2 rounded-sm p-4 shadow-md">
                            {penjualanAddFormFieldMap}
                        </form>
                    )}
                    <div className="flex flex-col gap-2">
                        {isAdd > 0 && (
                            <button
                                className="cursor-pointer rounded-sm bg-green-500 p-2 text-white shadow-md"
                                onClick={() => {
                                    setIsAdd((prevState) => {
                                        return prevState + 1;
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )}
                        {isAdd > 1 && (
                            <button
                                className="cursor-pointer rounded-sm bg-red-500 p-2 text-white shadow-md"
                                onClick={() => {
                                    setIsAdd((prevState) => {
                                        return prevState - 1;
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        )}
                    </div>
                    {penjualanItemMap}
                </div>
            </div>
        </div>
    );
}
