import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLocationDot,
    faPhone,
    faTrash,
    faPencil,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

interface Props {
    id: string;
    namaPelanggan: string;
    alamat: string;
    nomorTelepon: string;
}

export default function PelangganItem({
    id,
    namaPelanggan,
    alamat,
    nomorTelepon,
}: Props) {
    interface UpdateForm {
        id: string;
        namaPelangganBaru: string;
        alamatBaru: string;
        nomorTeleponBaru: string;
    }

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [updateForm, setUpdateForm] = useState<UpdateForm>({
        id: id,
        namaPelangganBaru: "",
        alamatBaru: "",
        nomorTeleponBaru: "",
    });

    async function deletePelanggan() {
        try {
            const response = await fetch("http://localhost:3000/pelanggan", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
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
            const response = await fetch("http://localhost:3000/pelanggan", {
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
                                placeholder={namaPelanggan}
                                onChange={updateFormOnChange}
                                value={updateForm.namaPelangganBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className="w-4" icon={faUser} />
                            <p>{namaPelanggan}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`alamat-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faLocationDot}
                                />
                            </label>
                            <input
                                id={`alamat-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="alamatBaru"
                                placeholder={alamat}
                                onChange={updateFormOnChange}
                                value={updateForm.alamatBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faLocationDot}
                            />
                            <p>{alamat}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`nomor-telepon-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faPhone}
                                />
                            </label>
                            <input
                                id={`nomor-telepon-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="nomorTeleponBaru"
                                placeholder={nomorTelepon}
                                onChange={updateFormOnChange}
                                value={updateForm.nomorTeleponBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className="w-4" icon={faPhone} />
                            <p>{nomorTelepon}</p>
                        </>
                    )}
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
                    onClick={deletePelanggan}
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
