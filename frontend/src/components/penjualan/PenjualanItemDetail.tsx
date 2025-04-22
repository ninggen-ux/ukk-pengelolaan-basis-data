import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faBoxesStacked,
    faRupiahSign,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    jumlahProduk: number;
    produk: string;
    subTotal: string;
}

export default function PenjualanItemDetail({
    jumlahProduk,
    produk,
    subTotal,
}: Props) {
    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faShoppingCart} />
                <p>{produk}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faBoxesStacked} />
                <p>{jumlahProduk}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faRupiahSign} />
                <p>{subTotal}</p>
            </div>
        </div>
    );
}
