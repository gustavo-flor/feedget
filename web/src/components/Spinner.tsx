import { CircleNotch } from "phosphor-react";

const Spinner = () =>
    <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
        <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
    </div>

export default Spinner