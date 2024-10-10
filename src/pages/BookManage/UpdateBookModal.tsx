import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import CoverUpload from "./CoverUpload";
import { bookDetailSvc, bookUpdateSvc } from "../../interfaces";
import { useEffect } from "react";

interface UpdateBookModalProps {
  id: number;
  isOpen: boolean;
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface UpdateBook {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

const UpdateBookModal = ({ id, isOpen, handleClose }: UpdateBookModalProps) => {
  const [form] = useForm<UpdateBook>();

  const query = async () => {
    if (!id) return;

    try {
      const res = await bookDetailSvc(id);
      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue("id", data.id);
        form.setFieldValue("name", data.name);
        form.setFieldValue("author", data.author);
        form.setFieldValue("description", data.description);
        form.setFieldValue("cover", data.cover);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }

  useEffect(() => {
    query();
  }, [id]);

  const handleOk = async () => {
    await form.validateFields();

    const values = form.getFieldsValue();

    try {
      const res = await bookUpdateSvc({ ...values, id: id });

      if (res.status === 201 || res.status === 200) {
        message.success("更新成功");
        handleClose();
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

  return (
    <Modal
      title="更新图书"
      open={isOpen}
      onOk={handleOk}
      onCancel={() => handleClose()}
      okText={"更新"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="图书名称"
          name="name"
          rules={[{ required: true, message: "请输入图书名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="作者"
          name="author"
          rules={[{ required: true, message: "请输入图书作者!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: "请输入图书描述!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="封面"
          name="cover"
          rules={[{ required: true, message: "请上传图书封面!" }]}
        >
          <CoverUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBookModal;
