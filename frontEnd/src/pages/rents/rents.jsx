import { format } from 'date-fns';
import { Pagination } from 'flowbite-react';
import { useParams } from "react-router-dom";
import RentsHead from './rentsTable/rentsHead'
import RentsList from './rentsTable/rentsList'
import React, { useEffect, useState } from "react";
import { oneRent } from "../../../requests_api/rents";
import { allUsers } from "../../../requests_api/users";
import { viewBooks } from "../../../requests_api/books";

export default function Rents() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rents, setRents] = useState([]);
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const User = localStorage.getItem('user');
    const userData = JSON.parse(User);

    const onPageChange = (page) => setCurrentPage(page);
    const { id } = useParams()


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await viewBooks();
                setBooks(response);
            } catch (error) {
                console.error("Erro search book:", error);
            }
        };

        fetchBooks();
    }, []);


    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await allUsers();
                setUser(response);
                setTotalPages(Math.ceil(response.length / 5));
            } catch (error) {
                console.error("Erro search rents:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await oneRent(id);
                setRents(response);
                // setTotalPages(Math.ceil(response.length / 5));
            } catch (error) {
                console.error("Erro search rents:", error);
            }
        };

        fetchRents();
    }, []);

    function getStandardFormattedDateTime(dateTimeString) {
        const datePart = dateTimeString.split('T')[0];
        return datePart.split('-').reverse().join('-');
    }


    // const indexOfLastAuthor = currentPage * 5;
    // const indexOfFirstAuthor = indexOfLastAuthor - 5;
    // const currentRents = rents.slice(indexOfFirstAuthor, indexOfLastAuthor);
    return (
        <>
            {userData.id == id ? <div>
                {rents.length == 0 ? (
                    <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                        <h1 className="text-4xl">You don't have Rents yet</h1>
                        <p className="">Rent some books</p>
                    </div>) :
                    <div className="flex items-center justify-center mt-20" >
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <RentsHead />
                                {currentRents.map((rents) => (
                                    <RentsList
                                        key={rents.id}
                                        rented_date={getStandardFormattedDateTime(rents.pick_up_date)}
                                        due_date={getStandardFormattedDateTime(rents.returns_date)}
                                        user_id={user.find(user => user.id === rents.id_user)?.username || "N/A"}
                                        books_id={books.find(book => book.id === rents.id_books)?.title || "N/A"}
                                        id={rents.id} />
                                ))}
                            </table>
                        </div>
                    </div>}
                {rents.length != 0 ? <div>
                    {totalPages != 1 && <div className="flex justify-center mt-4">
                        <Pagination
                            layout="pagination"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            previousLabel="Back"
                            nextLabel="Next"
                            showIcons
                        />
                    </div>}
                </div> : <div className="hidden"></div>}
            </div> : <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                <h1 className="text-4xl">You don't have Permission for enter this page ✋</h1>
            </div>}
        </>
    )
}