import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '@material-ui/icons/Close';

const ModalComp = (props) => {
    const { showModal, handleClose, title, component } = props;

    return (
        <div className="modalMap">
            <Dialog open={showModal} aria-labelledby="form-dialog-title">
                <Close onClick={() => handleClose(true)} className="closeModal" />
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {component}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { ModalComp };