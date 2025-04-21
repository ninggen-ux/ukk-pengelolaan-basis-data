import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

interface Props {
    sliderCount: number;
    setSliderCount: Dispatch<SetStateAction<number>>;
}

export default function Slider(props: Props) {
    function sliderCountUp() {
        if (props.sliderCount === 3) {
            props.setSliderCount(1);
        } else {
            props.setSliderCount((prevState) => {
                return prevState + 1;
            });
        }
    }

    function sliderCountDown() {
        if (props.sliderCount === 1) {
            props.setSliderCount(3);
        } else {
            props.setSliderCount((prevState) => {
                return prevState - 1;
            });
        }
    }

    return (
        <div className="flex items-center justify-center gap-4">
            <button className="cursor-pointer" onClick={sliderCountDown}>
                <FontAwesomeIcon
                    className="text-lg text-blue-600"
                    icon={faAngleLeft}
                />
            </button>
            <button
                className="cursor-pointer"
                onClick={() => props.setSliderCount(1)}
            >
                <FontAwesomeIcon
                    className={
                        props.sliderCount !== 1
                            ? "text-gray-500"
                            : "text-blue-600"
                    }
                    icon={faCircle}
                />
            </button>
            <button
                className="cursor-pointer"
                onClick={() => props.setSliderCount(2)}
            >
                <FontAwesomeIcon
                    className={
                        props.sliderCount !== 2
                            ? "text-gray-500"
                            : "text-blue-600"
                    }
                    icon={faCircle}
                />
            </button>
            <button
                className="cursor-pointer"
                onClick={() => props.setSliderCount(3)}
            >
                <FontAwesomeIcon
                    className={
                        props.sliderCount !== 3
                            ? "text-gray-500"
                            : "text-blue-600"
                    }
                    icon={faCircle}
                />
            </button>
            <button className="cursor-pointer" onClick={sliderCountUp}>
                <FontAwesomeIcon
                    className="text-lg text-blue-600"
                    icon={faAngleRight}
                />
            </button>
        </div>
    );
}
