import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {

    const { listUsers, pageCount, search } = props;

    const handlePageClick = (event) => {

        if (!search) {
            props.fetchListUsersWithPaginate(+event.selected + 1)
            props.setCurrentPage(+event.selected + 1);
        }
        if (search) {
            props.handleSearchUser(+event.selected + 1);
            props.setCurrentPage(+event.selected + 1);
        }

        // props.fetchListUsersWithPaginate(+event.selected + 1)
        // props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0
                            ?
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`table-users-${index}`}>
                                        <td>{item.user_id}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className="btn btn-info mx-1 my-1"
                                                onClick={() => props.handleClickBtnView(item)}
                                            >View</button>
                                            <button className="btn btn-success mx-1 my-1"
                                                onClick={() => props.handleClickBtnUpdate(item)}
                                            >Update</button>
                                            <button className="btn btn-danger mx-1 my-1"
                                                onClick={() => props.handleClickBtnDelete(item)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="5">Not found data</td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate;