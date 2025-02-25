import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../Service/apiService';
import { toast } from 'react-toastify';
import { deleteEvent, deleteFood, deleteShopping, deleteUsers } from '../../../Service/apiServices'

const ModalDeleteShopping = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteShopping(dataDelete.shopping_center_id)
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListShoppingWithPaginate(1);
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(1)
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
        }
    }
    console.log(dataDelete)
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the shopping?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this shopping, title:
                    <b>{dataDelete && dataDelete.title ? dataDelete.title : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleSubmitDeleteUser()}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteShopping;