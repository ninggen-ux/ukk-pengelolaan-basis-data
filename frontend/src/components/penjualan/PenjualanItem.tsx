import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faRupiahSign,
    faBox,
    faAngleDown,
    faUser,
    faTrash,
    faPencil,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import PenjualanItemDetail from "./PenjualanItemDetail.tsx";

interface DetailPenjualan {
    id: string;
    jumlahProduk: number;
    produk: string;
    subTotal: string;
}
interface Props {
    id: string;
    pelanggan: string;
    tanggalPenjualan: string;
    totalHarga: string;
    detailPenjualan: DetailPenjualan[];
}

export default function PenjualanItem({
    id,
    pelanggan,
    tanggalPenjualan,
    totalHarga,
    detailPenjualan,
}: Props) {
    interface UpdateForm {
        id: string;
        namaPelangganBaru: string;
        tanggalBaru: string;
        totalBaru: string;
    }

    const [detailProduk, setDetailProduk] = useState<boolean>(false);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [updateForm, setUpdateForm] = useState<UpdateForm>({
        id: id,
        namaPelangganBaru: "",
        tanggalBaru: "",
        totalBaru: "",
    });

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

    async function deletePenjualan() {
        try {
            const response = await fetch("http://localhost:3000/penjualan", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    penjualanId: id,
                    penjualanItemId: detailPenjualan.map((item) => item.id),
                }),
            });

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    text: responseJson.message,
                });
            }
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

    function updateFormOnChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setUpdateForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function onSubmitUpdate() {
        try {
            const response = await fetch("http://localhost:3000/penjualan", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateForm),
            });

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    text: responseJson.message,
                });
            }

            setIsUpdate(false);
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

    return (
        <div className="flex justify-between rounded-sm p-4 shadow-md">
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`nama-pelanggan-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faUser}
                                />
                            </label>
                            <input
                                id={`nama-pelanggan-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="namaPelangganBaru"
                                placeholder={pelanggan}
                                onChange={updateFormOnChange}
                                value={updateForm.namaPelangganBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className="w-4" icon={faUser} />
                            <p>{pelanggan}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`tanggal-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faCalendar}
                                />
                            </label>
                            <input
                                id={`tanggal-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="tanggalBaru"
                                placeholder={tanggalPenjualan}
                                onChange={updateFormOnChange}
                                value={updateForm.tanggalBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faCalendar}
                            />
                            <p>{tanggalPenjualan}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`total-harga-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faRupiahSign}
                                />
                            </label>
                            <input
                                id={`total-harga-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="totalBaru"
                                placeholder={totalHarga}
                                onChange={updateFormOnChange}
                                value={updateForm.totalBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faRupiahSign}
                            />
                            <p>{totalHarga}</p>
                        </>
                    )}
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
            <div className="flex gap-[0_0.7rem]">
                {isUpdate && (
                    <button
                        className="cursor-pointer"
                        type="button"
                        onClick={onSubmitUpdate}
                    >
                        <FontAwesomeIcon
                            className="aspect-square rounded-sm bg-green-600 p-4 text-lg text-white"
                            icon={faCheck}
                        />
                    </button>
                )}
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() =>
                        setIsUpdate((prevState) => {
                            return !prevState;
                        })
                    }
                >
                    <FontAwesomeIcon
                        className="aspect-square rounded-sm bg-blue-600 p-4 text-lg text-white"
                        icon={faPencil}
                    />
                </button>
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={deletePenjualan}
                >
                    <FontAwesomeIcon
                        className="aspect-square rounded-sm bg-red-600 p-4 text-lg text-white"
                        icon={faTrash}
                    />
                </button>
            </div>
        </div>
    );
}
