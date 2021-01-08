import React from 'react';
import {TableMap} from '../../shared'
import Box from '@material-ui/core/Box'

const PolygonList = (props) => {
    return (
        <React.Fragment>
            <Box mt={5} mb={2}>
                <b>لیست محدوده سفارش گیری شعبه</b>
            </Box>
            <Box>
                <TableMap />
            </Box>
        </React.Fragment>
    );
};

export default PolygonList;