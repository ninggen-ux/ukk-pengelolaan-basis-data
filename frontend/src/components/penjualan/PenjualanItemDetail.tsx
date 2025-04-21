import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faBoxesStacked,
    faRupiahSign,
} from "@fortawesome/free-solid-svg-icons";

export default function PenjualanItemDetail() {
    return (
        <div className="flex flex-col rounded-sm p-4 shadow-md">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faShoppingCart} />
                <p>Lorem Ipsum</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faBoxesStacked} />
                <p>xx</p>
            </div>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon className="w-4" icon={faRupiahSign} />
                <p>xx.xxx.xxx</p>
            </div>
        </div>
    );
}
