import React, { useState } from 'react';
import { Button, Form, Input, theme } from 'antd';

import BookCard from './BookCard';

const AddBooks = () => {
    const [form] = Form.useForm();
    const [books, setBooks] = useState([
        {
            id: 1, 
            name: "Outliers",
            description: "The Story of Success",
        }
    ])
    const [currentBookName, setCurrentBookName] = useState("");
    const [nextItemId, setNextItemId] = useState(2);
    const [currentBookDescription, setCurrentBookDescription] = useState("");
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const addBook = (e) => {
        if (currentBookName === "") {
            return;
        }
        const newBook = {
            id: nextItemId,
            name: currentBookName,
            description: currentBookDescription,
        }
        setBooks([...books, newBook])
        setNextItemId(nextItemId + 1)
        setCurrentBookName("")
    } 

    const deleteBook = (id) => {
        const newBooks = books.filter((book) => book.id !== id)
        setBooks(newBooks)
    }

    return (
        <div  
        style={{ padding: 24, minHeight: 360, background: colorBgContainer, display: "flex", flexDirection: "column", alignItems: "start" }}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={addBook}>
                <Form.Item
                    name="book"
                    label="Book Name"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input
                        placeholder="Enter Book Name"
                        onChange={(e) => setCurrentBookName(e.target.value)}
                        value={currentBookName}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input
                        placeholder="Enter Book Description"
                        onChange={(e) => setCurrentBookDescription(e.target.value)}
                        value={currentBookDescription}
                    />
                </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Book
                    </Button>
                </Form>
                
            <br/>
            <div
                style={{ padding: 24, minHeight: 360, background: colorBgContainer, display: "flex", flexDirection: "row", alignItems: "center" }}
            >
                {books.map((book)=>{
                    return (
                        <BookCard 
                            BookName={book.name}
                            key={book.id}
                            description={book.description}
                            id={book.id}
                            onDelete={deleteBook}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default AddBooks
