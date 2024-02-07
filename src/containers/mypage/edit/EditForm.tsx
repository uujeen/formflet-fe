'use client';

import { useEffect } from 'react';
import { useFormStore } from '@/store/store';
import useModalStore from '@/store/modalStore';
import FormEditModal from '@/components/modal/edit/FormEditModal';

export default function EditForm() {
  const { formTitle, form, replyStatus, createForm, setFormTitle, setForm } = useFormStore(
    (state) => ({
      formTitle: state.formTitle,
      form: state.form,
      replyStatus: state.replyStatus,
      createForm: state.createForm,
      setFormTitle: state.setFormTitle,
      setForm: state.setForm,
    }),
  );
  const { setModal } = useModalStore();

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // 콘텐츠 높이에 맞게 조정
  };

  const handleCreateForm = () => {
    if (replyStatus && !createForm) {
      setModal(<FormEditModal />);
    }
  };

  useEffect(() => {
    const resizeHandler = () => {
      const textarea = document.getElementById('textarea-form');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []); // 초기 렌더링 시에만 실행

  return (
    <div className="flex flex-col items-start self-stretch w-full h-full gap-5">
      <input
        className="w-full resize-none h1-bold placeholder:text-gray-light-active text-gray-dark-active"
        placeholder="제목을 입력해주세요"
        onChange={(e) => setFormTitle(e.currentTarget.value)}
        value={formTitle}
      />
      <hr className="self-stretch text-gray-light-active" />
      <textarea
        id="textarea-form"
        className="w-full h-full resize-none focus:outline-none"
        value={form}
        onInput={(e) => handleInput(e)}
        onChange={(e) => setForm(e.currentTarget.value)}
        onClick={handleCreateForm}
      />
    </div>
  );
}
