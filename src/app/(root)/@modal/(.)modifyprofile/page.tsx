"use client";
export default function Page(props: { params: { id: string } }) {
    const { id } = props.params;
    alert("modal");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4">Modal!</h2>
                <p className="text-gray-700">{id}</p>
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
