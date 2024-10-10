import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";

interface CoverUploadProps {
  value?: string;
  onChange?: Function;
}

// 自定义formItem 控件
const CoverUpload = ({ value, onChange }: CoverUploadProps) => {
  return (
    <div>
      {!!value && (
        <img
          src={"http://localhost:3000/" + value}
          alt="封面"
          width="100"
          height="100"
        />
      )}

      <Dragger
        name="file"
        action="http://localhost:3000/book/upload"
        method="post"
        onChange={(info) => {
          console.log('info', info)
          const { status } = info.file;
          if (status === "done") {
            // info.file.response // 上传接口返回 "uploads/1728542922047-57u27k-1 09.41.00 (1).png"
            if (typeof onChange === 'function') {
              onChange(info.file.response);
            }
            message.success(`${info.file.name} 文件上传成功`);
          } else if (status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
      </Dragger>
    </div>
  );
}

export default CoverUpload;
