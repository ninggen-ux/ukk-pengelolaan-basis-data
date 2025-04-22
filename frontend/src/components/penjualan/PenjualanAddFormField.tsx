import PenjualanAddFormFieldProduk from "./PenjualanAddFormFieldProduk.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faBoxesStacked,
    faRupiahSign,
} from "@fortawesome/free-solid-svg-icons";
import {
    useState,
    ChangeEvent,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";

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
    id: number;
    setAllPenjualanFormData: Dispatch<
        SetStateAction<AllPenjualanFormDataWithUser>
    >;
}

export default function PenjualanAddFormField({
    id,
    setAllPenjualanFormData,
}: Props) {
    interface PenjualanFormData {
        produk: string;
        produkId: string;
        jumlahProduk: number;
        hargaPerProduk: number;
        subTotal: number;
    }
    interface ProdukData {
        id: string;
        namaProduk: string;
        harga: number;
        stok: number;
    }

    const [onInputFokus, setOnInputFokus] = useState<boolean>(false);

    const [penjualanFormData, setPenjualanFormData] =
        useState<PenjualanFormData>({
            produk: "",
            produkId: "",
            hargaPerProduk: 0,
            jumlahProduk: 1,
            subTotal: 0,
        });

    const [produkData, setProdukData] = useState<ProdukData[]>([]);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setPenjualanFormData((prevState) => {
            return { ...prevState, [name]: value };
        });
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
    });

    const penjualanAddFormFieldProdukMap = produkData.map((item) => {
        return (
            <PenjualanAddFormFieldProduk
                key={item.id}
                id={item.id}
                setPenjualanFormData={setPenjualanFormData}
                namaProduk={item.namaProduk}
                harga={item.harga}
            />
        );
    });

    useEffect(() => {
        if (
            penjualanFormData.produk !== "" &&
            penjualanFormData.hargaPerProduk !== 0
        ) {
            setPenjualanFormData((prevState) => {
                return {
                    ...prevState,
                    subTotal: prevState.hargaPerProduk * prevState.jumlahProduk,
                };
            });
        }
    }, [
        penjualanFormData.produk,
        penjualanFormData.hargaPerProduk,
        penjualanFormData.jumlahProduk,
    ]);

    useEffect(() => {
        setAllPenjualanFormData((prevState) => {
            const prevStateData = prevState.data;

            const newData = [...prevStateData];
            newData[id] = penjualanFormData;
            return { ...prevState, data: newData };
        });
    }, [penjualanFormData, id, setAllPenjualanFormData]);

    return (
        <div className="flex flex-col gap-2 rounded-sm p-2 shadow">
            <div className="flex items-center gap-4">
                <label htmlFor={`produk-${id}`}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </label>
                <div className="relative">
                    <input
                        className="rounded-sm border p-[0.2rem_0.5rem]"
                        id={`produk-${id}`}
                        type="text"
                        placeholder="Produk"
                        onFocus={() => setOnInputFokus(true)}
                        onBlur={() =>
                            setTimeout(() => setOnInputFokus(false), 100)
                        }
                        value={penjualanFormData.produk}
                        readOnly
                    />
                    <div
                        className={`${onInputFokus ? "flex" : "hidden"} absolute left-0 z-10 max-h-40 flex-col gap-2 overflow-auto rounded-sm bg-white p-2 shadow`}
                    >
                        {penjualanAddFormFieldProdukMap}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor={`jumlah-produk-${id}`}>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                </label>
                <input
                    className="rounded-sm border p-[0.2rem_0.5rem]"
                    id={`jumlah-produk-${id}`}
                    name="jumlahProduk"
                    type="number"
                    placeholder="Kuantitas Produk"
                    onChange={onChangeHandler}
                    value={penjualanFormData.jumlahProduk}
                    min={1}
                />
            </div>
            {penjualanFormData.subTotal !== 0 && (
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faRupiahSign} />
                    <span>{penjualanFormData.subTotal}</span>
                </div>
            )}
        </div>
    );
}
