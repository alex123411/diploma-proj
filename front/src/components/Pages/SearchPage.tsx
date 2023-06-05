import { FC, PropsWithChildren } from "react"
import MainForm from "../MainForm";


interface Props extends PropsWithChildren {
    className?: string;
}

const SearchPage: FC<Props> = ({ children, className, ...props }) => {
    return (
        <MainForm className='mt-3' />
    )
}

export default SearchPage