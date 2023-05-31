import { FC, PropsWithChildren } from "react"
import MainForm from "../MainForm";


interface Props extends PropsWithChildren {
    className?: string;
}

const SearchPage: FC<Props> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={className}>
            <MainForm className='mt-3' />
        </div>
    )
}

export default SearchPage