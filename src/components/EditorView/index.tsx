import React from 'react';
import BraftEditor, { EditorState, MediaType, ControlType } from 'braft-editor';
import { limitUploadSize } from '@/utils';
import { uploadImg } from '@/services/upload';
import zdsTips from '@/utils/tips';

interface IProps {
  editorState: any;
  placeholder?: string;
  setEditorState: (editorState: EditorState) => void;
}
const controls: ControlType[] = ['undo', 'redo', 'separator', 'font-size', 'separator', 'text-color', 'bold', 'italic', 'underline', 'separator', 'remove-styles', 'media'];
const EditorView: React.FC<IProps> = ({ editorState, placeholder, setEditorState }) => {

  const onChange = (state: EditorState) => {
    const html = state.toHTML()
    if (['<p></p>'].includes(html)) {
      setEditorState('')
      return
    }
    setEditorState(state)
  }

  // 文档：https://www.yuque.com/braft-editor/be/gz44tn#bo49ph
  const mediaObj: MediaType = {
    uploadFn: (param) => {
      const { file } = param
      if (!limitUploadSize(file.size, 5)) {
        uploadImg(file)
          .then(resp => {
            zdsTips.success('文件上传成功');
            param.success({
              url: resp,
              meta: {
                id: 'xxx',
                title: 'xxx',
                alt: 'xxx',
                loop: false, // 指定音视频是否循环播放
                autoPlay: false, // 指定音视频是否自动播放
                controls: false, // 指定音视频是否显示控制栏
                poster: 'xxxx', // 指定视频播放器的封面
              },
              width: '100%'
            })
          })
          .catch(() => {
            param.error({
              msg: `${file.name} 文件上传失败`
            })
          })
      } else {
        param.error({
          msg: `图片大小不得超过5M`
        })
      }
    },
    accepts: {
      image: 'image/png,image/jpeg,image/jpg',
      video: false,
      audio: false
    },
    externals: {
      image: true,
      video: false,
      audio: false,
      embed: false
    },
    pasteImage: false
  }

  return (
    <BraftEditor
      value={editorState}
      placeholder={placeholder}
      onChange={onChange}
      imageResizable={false}
      controls={controls}
      contentStyle={{ height: '500px' }}
      style={{ width: '100%' }}
      media={mediaObj}
    />
  )
};
export default EditorView;
