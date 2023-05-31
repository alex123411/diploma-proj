import { FC, PropsWithChildren } from "react"
import companyLogo from '@assets/bootstrap-logo.svg';
import profileImage from '@assets/profile-icon.png';

import { Link } from "react-router-dom";


interface Props {
}

const Header: FC<Props> = ({ ...props }) => {
    return (
        <nav {...props} className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img 
                        src={companyLogo} 
                        alt="Logo" 
                        className="d-inline-block align-text-bottom me-1"
                        width="30" height="24"  
                    />
                    JobInsight
                </Link>

                <Link to="/profile" className="nav-link">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-icon"
                        width="30" height="30"
                    />
                </Link>
            </div>
        </nav>
    )
}

export default Header