import HomeIcon from '@mui/icons-material/Home';
import {Box, Breadcrumbs, Link} from "@mui/material";
// import {useParams} from "react-router-dom";

const MuiBreadcrumbs = () => {
    // const path = useParams();
    return (
        <Box>
            <Breadcrumbs className="pt-9">
                <Link underline="hover"><HomeIcon color="action"/></Link>
                <Link underline="hover" color="action">Catalog</Link>
                <Link underline="hover" color="action">About</Link>
                <Link underline="hover" color="action">Shoes</Link>
            </Breadcrumbs>
        </Box>
    );
};

export default MuiBreadcrumbs;
