import PelangganItem from "../components/pelanggan/PelangganItem.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCheck,
    faXmark,
    faUser,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState, ChangeEvent, useEffect } from "react";

export default function Pelanggan() {
    interface PelangganFormData {
        namaPelanggan: string;
        alamat: string;
        nomorTelepon: string;
    }

    interface PelangganData {
        id: string;
        namaPelanggan: string;
        alamat: string;
        nomorTelepon: string;
    }

    const [isAdd, setIsAdd] = useState<boolean>(false);

    const [pelangganFormData, setPelangganFormData] =
        useState<PelangganFormData>({
            namaPelanggan: "",
            alamat: "",
            nomorTelepon: "",
        });

    const [pelangganData, setPelangganData] = useState<PelangganData[]>([]);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setPelangganFormData((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    async function onSubmitForm() {
        try {
            if (pelangganFormData.namaPelanggan === "") {
                throw new Error("Tolong isi Nama Pelanggan");
            } else if (pelangganFormData.alamat === "") {
                throw new Error("Tolong isi Alamat");
            } else if (pelangganFormData.nomorTelepon === "") {
                throw new Error("Tolong isi Nomor Telepon");
            }

            setIsAdd(false);

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
    });

    const pelangganItemMap = pelangganData.map((item) => {
        return (
            <PelangganItem
                key={item.id}
                namaPelanggan={item.namaPelanggan}
                alamat={item.alamat}
                nomorTelepon={item.nomorTelepon}
            />
        );
    });

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-4xl font-medium uppercase">Pelanggan</h1>
            <div className="flex w-10/12 flex-col gap-2">
                <div className="flex w-full justify-end gap-2">
                    {isAdd ? (
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
                                onClick={() => setIsAdd(false)}
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
                            onClick={() => setIsAdd(true)}
                        >
                            <FontAwesomeIcon
                                className="aspect-[1/1] rounded-sm bg-green-500 p-2 text-white"
                                icon={faPlus}
                            />
                        </button>
                    )}
                </div>
                <div className="flex max-h-[60dvh] flex-col gap-4 overflow-y-auto">
                    {isAdd && (
                        <form className="flex flex-col gap-2 rounded-sm p-4 shadow-md">
                            <div className="flex items-center gap-4">
                                <label htmlFor="nama-pelanggan">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faUser}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="nama-pelanggan"
                                    type="text"
                                    placeholder="Nama Pelanggan"
                                    name="namaPelanggan"
                                    onChange={onChangeHandler}
                                    value={pelangganFormData.namaPelanggan}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="alamat">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faLocationDot}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="alamat"
                                    type="text"
                                    placeholder="Alamat"
                                    name="alamat"
                                    onChange={onChangeHandler}
                                    value={pelangganFormData.alamat}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="nomor-telepon">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faPhone}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="nomor-telepon"
                                    type="text"
                                    placeholder="Nomor Telepon"
                                    name="nomorTelepon"
                                    onChange={onChangeHandler}
                                    value={pelangganFormData.nomorTelepon}
                                />
                            </div>
                        </form>
                    )}
                    {pelangganItemMap}
                </div>
            </div>
        </div>
    );
}
