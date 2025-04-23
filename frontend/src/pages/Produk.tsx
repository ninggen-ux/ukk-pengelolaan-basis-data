import ProdukItem from "../components/produk/ProdukItem.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCheck,
    faXmark,
    faBox,
    faRupiahSign,
    faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState, ChangeEvent, useEffect } from "react";

export default function Produk() {
    interface ProdukFormData {
        namaProduk: string;
        harga: number;
        stok: number;
    }

    interface ProdukData {
        id: string;
        namaProduk: string;
        harga: string;
        stok: number;
    }

    const [isAdd, setIsAdd] = useState<boolean>(false);

    const [produkFormData, setProdukFormData] = useState<ProdukFormData>({
        namaProduk: "",
        harga: 0,
        stok: 0,
    });

    const [produkData, setProdukData] = useState<ProdukData[]>([]);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setProdukFormData((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    async function onSubmitForm() {
        try {
            if (produkFormData.namaProduk === "") {
                throw new Error("Tolong isi Nama Produk");
            } else if (produkFormData.harga === 0) {
                throw new Error("Tolong isi Harga Produk");
            } else if (produkFormData.stok === 0) {
                throw new Error("Tolong isi Stok Produk");
            }

            const response = await fetch("http://localhost:3000/produk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produkFormData),
            });

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                setIsAdd(false);

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

    useEffect(() => {
        async function getProduk() {
            try {
                const response = await fetch("http://localhost:3000/produk");

                const responseJson = await response.json();

                setProdukData(responseJson.data);
            } catch (err) {
                console.error(err);
            }
        }

        getProduk();
    }, []);

    const produkItemMap = produkData.map((item) => {
        return (
            <ProdukItem
                key={item.id}
                id={item.id}
                namaProduk={item.namaProduk}
                harga={item.harga}
                stok={item.stok}
            />
        );
    });

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-4xl font-medium uppercase">Produk</h1>
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
                                <label htmlFor="nama-produk">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faBox}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="nama-produk"
                                    type="text"
                                    placeholder="Nama Produk"
                                    name="namaProduk"
                                    onChange={onChangeHandler}
                                    value={produkFormData.namaProduk}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="harga">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faRupiahSign}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="harga"
                                    type="text"
                                    placeholder="Harga"
                                    name="harga"
                                    onChange={onChangeHandler}
                                    value={produkFormData.harga}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="stok">
                                    <FontAwesomeIcon
                                        className="w-4"
                                        icon={faBoxesStacked}
                                    />
                                </label>
                                <input
                                    className="rounded-sm border p-[0.2rem_0.5rem]"
                                    id="stok"
                                    type="text"
                                    placeholder="Stok"
                                    name="stok"
                                    onChange={onChangeHandler}
                                    value={produkFormData.stok}
                                />
                            </div>
                        </form>
                    )}
                    {produkItemMap}
                </div>
            </div>
        </div>
    );
}
