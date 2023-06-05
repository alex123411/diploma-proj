import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string;
}

const Loading: FC<Props> = ({ className, ...props }) => {

    return (
        <div className={className + " spinner-border mt-2"} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );

}
export default Loading;