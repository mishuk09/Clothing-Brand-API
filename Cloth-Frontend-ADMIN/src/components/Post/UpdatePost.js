import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import { useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const UpdatePost = () => {
    const { id } = useParams();
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get(`http://localhost:5000/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const post = response.data;
                setImg(post.img);
                setCategory(post.category);
                setTitle(post.title);
                setNewPrice(post.newPrice);
                setOldPrice(post.oldPrice);
                setColor(post.color || []);
                setSize(post.size || []);
                setDescription(post.description);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    window.location.href = '/signin';
                }
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = { img, category, title, newPrice, oldPrice, color, size, description };

        axios.post(`http://localhost:5000/posts/update/${id}`, updatedPost)
            .then(res => console.log(res.data))
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
            <h2 className="text-2xl text-center font-semibold mb-6">Update Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-4 text-sm font-medium text-gray-700">Image:</label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setImg(base64)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Price:</label>
                    <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Old Price:</label>
                    <input type="number" value={oldPrice} onChange={e => setOldPrice(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Colors:</label>
                    {color.map((c, index) => (
                        <div key={index} className="flex space-x-2 mt-1">
                            <input
                                type="text"
                                value={c}
                                onChange={e => handleColorChange(index, e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddColor} className="mt-2 text-sm text-blue-600 hover:underline">
                        Add Color
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes:</label>
                    {size.map((s, index) => (
                        <div key={index} className="flex space-x-2 mt-1">
                            <input
                                type="text"
                                value={s}
                                onChange={e => handleSizeChange(index, e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSize} className="mt-2 text-sm text-blue-600 hover:underline">
                        Add Size
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <JoditEditor
                        value={description}
                        tabIndex={1}
                        onBlur={(newContent) => setDescription(newContent)}
                        onChange={(newContent) => { }}
                    />
                </div>
                <button type="submit" className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default UpdatePost;
