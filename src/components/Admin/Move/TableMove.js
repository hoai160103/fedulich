import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableMove = (props) => {

    const { listMove, pageCount, search } = props;

    const handlePageClick = (event) => {

        if (!search) {
            props.fetchListMoveWithPaginate(+event.selected + 1)
            props.setCurrentPage(+event.selected + 1);
        }
        if (search) {
            props.handleSearchMove(+event.selected + 1);
            props.setCurrentPage(+event.selected + 1);
        }

        // props.fetchListShoppingWithPaginate(+event.selected + 1)
        // props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };


    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Address</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listMove && listMove.length > 0
                            ?
                            listMove.map((item, index) => {
                                return (
                                    <tr key={`table-move-${index}`}>
                                        <td>{item.moves_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.address}</td>
                                        <td>{item.type_vehicle}</td>
                                        <td>
                                            <img src={`data:image/jpeg;base64,${item.moves_image_base64}`} class="rounded mx-auto d-block" style={{ maxWidth: '200px' }} alt="..."></img>
                                        </td>
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
                                <td colSpan="6">Not found data</td>
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

export default TableMove;