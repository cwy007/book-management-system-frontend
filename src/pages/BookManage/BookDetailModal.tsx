import { Button, Form, Modal, message } from "antd";
import { bookDetailSvc } from "../../interfaces";
import { useEffect, useState } from "react";
import { Book } from ".";

interface BookDetailModalProps {
  id: number;
  isOpen: boolean;
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BookDetailModal = ({ id, isOpen, handleClose }: BookDetailModalProps) => {
  const [detail, setDetail] = useState<Book>();
  const query = async () => {
    if (!id) return;

    try {
      const res = await bookDetailSvc(id);
      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        setDetail(data);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

  useEffect(() => {
    query();
  }, [id]);

  return (
    <Modal
      title="图书详情"
      open={isOpen}
      onCancel={() => handleClose()}
      footer={<Button onClick={() => handleClose()}>关闭</Button>}
    >
      <Form colon={false} {...layout}>
        <Form.Item label="图书名称" name="name">
          {detail?.name}
        </Form.Item>
        <Form.Item label="作者" name="author">
          {detail?.author}
        </Form.Item>
        <Form.Item label="描述" name="description">
          {detail?.description}
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <img
            alt="example"
            src={`http://localhost:3000/${detail?.cover}`}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookDetailModal;
