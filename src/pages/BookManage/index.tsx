import { Button, Card, Form, Input, message, Popconfirm, Space } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { bookListSvc, deleteBookSvc } from "../../interfaces";
import { CreateBookModal } from "./CreateBookModal";
import UpdateBookModal from "./UpdateBookModal";
import BookDetailModal from "./BookDetailModal";

export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

function BookManage() {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [name, setName] = useState("");
  const [isCreateBookModalOpen, setCraeteBookModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setBookDetailModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  async function fetchData() {
    try {
      const data = await bookListSvc(name);

      if (data.status === 201 || data.status === 200) {
        setBookList(data.data);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [name, timestamp]);

  async function searchBook(values: { name: string }) {
    setName(values.name);
  }

  async function handleDelete(id: number) {
    try {
      await deleteBookSvc(id);
      message.success("删除成功");
      setTimestamp(Date.now());
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }

  return (
    <div id="bookManage">
      <h1>图书管理系统</h1>
      <div className="content">
        <div className="book-search">
          <Form
            onFinish={searchBook}
            name="search"
            layout="inline"
            colon={false}
          >
            <Form.Item label="图书名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label=" ">
              <Space size={8}>
                <Button type="primary" htmlType="submit">
                  搜索图书
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "green" }}
                  onClick={() => setCraeteBookModalOpen(true)}
                >
                  添加图书
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className="book-list">
          {bookList.map((book) => {
            return (
              <Card
                key={book.id}
                className="card"
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    // src="https://file.ituring.com.cn/LargeCover/240360d61611dc18b25c"
                    // TODO
                    src={`http://localhost:3000/${book.cover}`}
                  />
                }
              >
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className="links">
                  <a
                    href="#"
                    onClick={() => {
                      setUpdateId(book.id);
                      setBookDetailModalOpen(true);
                    }}
                  >
                    详情
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      setUpdateId(book.id);
                      setUpdateBookModalOpen(true);
                    }}
                  >
                    编辑
                  </a>
                  <Popconfirm
                    title="图书删除"
                    description="确认删除吗？"
                    onConfirm={() => handleDelete(book.id)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        handleClose={() => {
          setCraeteBookModalOpen(false);
          // setName(''); // 刷新页面
          // window.location.reload(); // 刷新页面
          setTimestamp(Date.now());
        }}
      />

      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          setTimestamp(Date.now());
        }}
      />

      <BookDetailModal
        id={updateId}
        isOpen={isBookDetailModalOpen}
        handleClose={() => {
          setBookDetailModalOpen(false);
        }}
      />
    </div>
  );
}

export default BookManage;
