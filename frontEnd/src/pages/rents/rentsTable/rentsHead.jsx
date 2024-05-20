export default function rentsHead() {
    return (
        <>
            <thead className="text-xs text-white uppercase bg-gray-700 text-center">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        User
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rented date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Return date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Book
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
        </>
    )
}