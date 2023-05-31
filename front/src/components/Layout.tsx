import { FC, PropsWithChildren } from "react"


interface Props extends PropsWithChildren {
    className?: string;
}

const ContainerLayout: FC<Props> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={"container d-flex flex-column align-items-center " + className}>
            {children}
        </div>
    )
}

export default ContainerLayout