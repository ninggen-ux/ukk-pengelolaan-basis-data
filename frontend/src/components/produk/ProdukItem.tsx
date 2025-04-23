import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faRupiahSign,
    faBoxesStacked,
    faTrash,
    faPencil,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

interface Props {
    id: string;
    namaProduk: string;
    harga: string;
    stok: number;
}

export default function ProdukItem({ id, namaProduk, harga, stok }: Props) {
    interface UpdateForm {
        id: string;
        namaProdukBaru: string;
        hargaBaru: string;
        stokBaru: string;
    }

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [updateForm, setUpdateForm] = useState<UpdateForm>({
        id: id,
        namaProdukBaru: "",
        hargaBaru: "",
        stokBaru: "",
    });

    async function deleteProduk() {
        try {
            const response = await fetch("http://localhost:3000/produk", {
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
            const response = await fetch("http://localhost:3000/produk", {
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
                            <label htmlFor={`nama-produk-${id}`}>
                                <FontAwesomeIcon className="w-4" icon={faBox} />
                            </label>
                            <input
                                id={`nama-produk-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="namaProdukBaru"
                                placeholder={namaProduk}
                                onChange={updateFormOnChange}
                                value={updateForm.namaProdukBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className="w-4" icon={faBox} />
                            <p>{namaProduk}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`harga-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faRupiahSign}
                                />
                            </label>
                            <input
                                id={`harga-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="hargaBaru"
                                placeholder={harga}
                                onChange={updateFormOnChange}
                                value={updateForm.hargaBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faRupiahSign}
                            />
                            <p>{harga}</p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isUpdate ? (
                        <>
                            <label htmlFor={`stok-${id}`}>
                                <FontAwesomeIcon
                                    className="w-4"
                                    icon={faBoxesStacked}
                                />
                            </label>
                            <input
                                id={`stok-${id}`}
                                className="rounded-sm border p-[0_0.5rem]"
                                type="text"
                                name="stokBaru"
                                placeholder={String(stok)}
                                onChange={updateFormOnChange}
                                value={updateForm.stokBaru}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faBoxesStacked}
                            />
                            <p>{stok}</p>
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
                    onClick={deleteProduk}
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
