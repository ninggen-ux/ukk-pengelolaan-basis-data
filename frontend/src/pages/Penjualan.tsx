import PenjualanItem from "../components/penjualan/PenjualanItem";
import PenjualanAddFormField from "../components/penjualan/PenjualanAddFormField";
import PenjualanPelanggan from "../components/penjualan/PenjualanPelanggan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCheck,
    faXmark,
    faMinus,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Penjualan() {
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

    interface PelangganData {
        id: string;
        namaPelanggan: string;
        alamat: string;
        nomorTelepon: string;
    }

    const [isAdd, setIsAdd] = useState<number>(0);

    const [allPenjualanFormData, setAllPenjualanFormData] =
        useState<AllPenjualanFormDataWithUser>({
            pelanggan: "",
            pelangganId: "",
            data: [],
        });

    const [penjualanData, setPenjualanData] = useState<PenjualanData[]>([]);

    const [onInputFokus, setOnInputFokus] = useState<boolean>(false);

    const [pelangganData, setPelangganData] = useState<PelangganData[]>([]);

    console.log(allPenjualanFormData);

    async function onSubmitForm() {
        try {
            const response = await fetch("http://localhost:3000/penjualan", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(allPenjualanFormData),
            });

            const responseJson = await response.json();

            console.log(responseJson);

            setIsAdd(0);
        } catch (err: unknown) {
            console.error(err);
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

                console.log(responseJson);

                setPenjualanData(responseJson.data);
            } catch (err) {
                console.error(err);
            }
        }

        getPenjualan();
    }, []);

    useEffect(() => {
        async function getPelanggan() {
            try {
                const response = await fetch("http://localhost:3000/pelanggan");

                const responseJson = await response.json();

                setPelangganData(responseJson.data);
            } catch (err) {
                console.error(err);
            }
        }

        getPelanggan();
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

    const penjualanPelangganMap = pelangganData.map((item) => {
        return (
            <PenjualanPelanggan
                key={item.id}
                id={item.id}
                pelanggan={item.namaPelanggan}
                setAllPenjualanFormData={setAllPenjualanFormData}
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
                        <div className="flex items-center gap-4">
                            <label htmlFor="pelanggan">
                                <FontAwesomeIcon icon={faUser} />
                            </label>
                            <div className="relative">
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="pelanggan"
                                    type="text"
                                    placeholder="Pelanggan"
                                    onFocus={() => setOnInputFokus(true)}
                                    onBlur={() =>
                                        setTimeout(
                                            () => setOnInputFokus(false),
                                            100,
                                        )
                                    }
                                    value={allPenjualanFormData.pelanggan}
                                    readOnly
                                />
                                <div
                                    className={`${onInputFokus ? "flex" : "hidden"} absolute left-0 z-10 max-h-40 flex-col gap-2 overflow-auto rounded-sm bg-white p-2 shadow`}
                                >
                                    {penjualanPelangganMap}
                                </div>
                            </div>
                        </div>
                    )}
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
