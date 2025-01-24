import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const AddPost = () => {
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const editor = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get('https://mishuk09-clothing-brand-api-backend.onrender.com/addpost', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    window.location.href = '/signin';
                }
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { img, category, title, newPrice, oldPrice, color, size, description };

        axios.post('https://mishuk09-clothing-brand-api-backend.onrender.com/posts/add', newPost)
            .then(res => {
                console.log(res.data);
                // Reset fields
                setImg('');
                setCategory('');
                setTitle('');
                setNewPrice('');
                setOldPrice('');
                setColor([]);
                setSize([]);
                setDescription('');
                // Set success message
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
            })
            .catch(err => console.log(err));
    }

    const handleAddColor = () => {
        setColor([...color, '']);
    }

    const handleColorChange = (index, value) => {
        const newColors = [...color];
        newColors[index] = value;
        setColor(newColors);
    }

    const handleAddSize = () => {
        setSize([...size, '']);
    }

    const handleSizeChange = (index, value) => {
        const newSizes = [...size];
        newSizes[index] = value;
        setSize(newSizes);
    }

    return (
        <div className="container mt-10 p-6 bg-white">
            <h2 className="text-2xl text-center font-semibold mb-6">Add New Product</h2>



            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-4 text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        required
                        placeholder="Enter Image URL"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Price</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Old Price</label>
                    <input
                        type="number"
                        value={oldPrice}
                        onChange={(e) => setOldPrice(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Colors</label>
                    {color.map((c, index) => (
                        <div key={index} className="flex space-x-2 mt-1">
                            <input
                                type="text"
                                value={c}
                                onChange={e => handleColorChange(index, e.target.value)}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddColor}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                        Add Color
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes</label>
                    {size.map((s, index) => (
                        <div key={index} className="flex space-x-2 mt-1">
                            <input
                                type="text"
                                value={s}
                                onChange={e => handleSizeChange(index, e.target.value)}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSize}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                        Add Size
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1}
                        onBlur={(newContent) => setDescription(newContent)}
                        onChange={(newContent) => { }}
                    />
                </div>
                {successMessage && (
                    <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">
                        Add Successfull......
                    </div>
                )}
                <button
                    type="submit"
                    className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
}

export default AddPost;
