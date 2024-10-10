import { Button, Card, Form, Input, message, Space } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { bookListSvc } from "../../interfaces";
import { CreateBookModal } from "./CreateBookModal";

interface Book {
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
  }, [name]);

  async function searchBook(values: { name: string }) {
    setName(values.name);
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
                    src="https://file.ituring.com.cn/LargeCover/240360d61611dc18b25c"
                    // TODO
                    // src={`http://localhost:3000/${book.cover}`}
                  />
                }
              >
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className="links">
                  <a href="#">详情</a>
                  <a href="#">编辑</a>
                  <a href="#">删除</a>
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
          window.location.reload(); // 刷新页面
        }}
      />
    </div>
  );
}

export default BookManage;
