import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';
import { putUsers } from '../../../Service/apiServices';

function ModalUpdateUser(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        // setEmail('')
        // setPassword('')
        // setUsername('')
        // setRole('user')
        // setPhone('')
        // setFullName('')
        setValidationErrors({})
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);

            // update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.user_name);
            setFullName(dataUpdate.full_name);
            setPhone(dataUpdate.phone);
            setRole(dataUpdate.role);
            setPassword(dataUpdate.password);
            setValidationErrors({})
        }
    }, [dataUpdate])

    const validate = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!username) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }

        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{8,13}$/.test(phone)) {
            errors.phone = 'Phone number is invalid';
        }

        if (!fullName) {
            errors.fullName = 'Full name is required';
        } else if (fullName.length < 3) {
            errors.fullName = 'Full name must be at least 3 characters long';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }
        const validation = validate();
        if (validation === true) {
            let data = await putUsers(dataUpdate.user_id, {
                user_name: username,
                full_name: fullName,
                email: email,
                phone: phone,
                role: role,
                password: password
            })
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                await props.fetchListUsersWithPaginate(props.currentPage);
                setEmail('')
                setPassword('')
                setUsername('')
                setRole('user')
                setPhone('')
                setFullName('')
                setValidationErrors({})
                // props.setCurrentPage(1);
                // await props.fetchListUsersWithPaginate(props.currentPage)
            }
            if (data && data.code !== 201) {
                toast.error(data.message)
            }
        }
        else {
            // Hiển thị các lỗi
            setValidationErrors(validation);
            console.log(validation)
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                disabled
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                            {validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}

                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            {validationErrors.username && <span className="text-danger">{validationErrors.username}</span>}

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">FullName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                            {validationErrors.fullName && <span className="text-danger">{validationErrors.fullName}</span>}

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            {validationErrors.phone && <span className="text-danger">{validationErrors.phone}</span>}

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value='user'>USER</option>
                                <option value='admin'>ADMIN</option>
                            </select>
                        </div>
                        {/* <div classNameName='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />
                                Upload file Image
                            </label>
                            <input type='file' hidden id='labelUpload' 
                                onChange={(event) => handleUpLoadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {
                                previewImage
                                    ?
                                    <img src={previewImage} />
                                    :
                                    <span>Preview image</span>

                            }
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;