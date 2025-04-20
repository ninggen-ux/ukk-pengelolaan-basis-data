import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function PelangganItem() {
    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faUser} />
                <p>Nama Pelanggan</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faLocationDot} />
                <p>Alamat</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faPhone} />
                <p>+62 887-4472-8288</p>
            </div>
        </div>
    );
}
