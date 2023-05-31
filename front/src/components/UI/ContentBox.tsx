
import { FC, PropsWithChildren } from "react"


interface Props extends PropsWithChildren {
    className?: string;
}

const ContentBox: FC<Props> = ({ children, className="", ...props }) => {
    return (
        <div {...props} className={"shadow p-3 mb-5 bg-body rounded-3 " + className}>
            {children}
        </div>
    )
}

export default ContentBox