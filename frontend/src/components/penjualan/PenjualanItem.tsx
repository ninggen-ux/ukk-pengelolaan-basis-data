import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faRupiahSign,
    faBox,
    faAngleDown,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PenjualanItemDetail from "./PenjualanItemDetail.tsx";

export default function PenjualanItem() {
    const [detailProduk, setDetailProduk] = useState<boolean>(false);

    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faUser} />
                <p>Lorem Ipsum</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faCalendar} />
                <p>xx/xx/xxxx</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faRupiahSign} />
                <p>xx.xxx.xxx</p>
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
                    <PenjualanItemDetail />
                    <PenjualanItemDetail />
                    <PenjualanItemDetail />
                    <PenjualanItemDetail />
                    <PenjualanItemDetail />
                </div>
            </div>
        </div>
    );
}
