import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faRupiahSign,
    faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    namaProduk: string;
    harga: string;
    stok: number;
}

export default function ProdukItem({ namaProduk, harga, stok }: Props) {
    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faBox} />
                <p>{namaProduk}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faRupiahSign} />
                <p>{harga}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faBoxesStacked} />
                <p>{stok}</p>
            </div>
        </div>
    );
}
