import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    namaPelanggan: string;
    alamat: string;
    nomorTelepon: string;
}

export default function PelangganItem({
    namaPelanggan,
    alamat,
    nomorTelepon,
}: Props) {
    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faUser} />
                <p>{namaPelanggan}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faLocationDot} />
                <p>{alamat}</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faPhone} />
                <p>{nomorTelepon}</p>
            </div>
        </div>
    );
}
