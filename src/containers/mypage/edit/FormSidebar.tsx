import clsx from 'clsx';
import Toggle from '@/components/basic/Toggle';
import FormSquareIcon from '../../../../public/svg/FormSquareIcon';
import { useCtaStore, useDisplayStore, useFormStore } from '@/store/store';
import useModalStore from '@/store/modalStore';
import FormCancelModal from '@/components/modal/edit/FormCancelModal';
import FormCreateModal from '@/components/modal/edit/FormCreateModal';
import QuestionCircleSmall from '../../../../public/svg/QuestionCircleSmall';
import Tooltip from '@/components/common/Tooltip';
import Button from '@/components/basic/Button';
import SelectOptionIcon from '../../../../public/svg/SelectOptionIcon';

export default function FormSidebar() {
  const { formStatus, formOpen, setFormStatus, setFormOpen } = useFormStore((state) => ({
    formStatus: state.formStatus,
    formOpen: state.formOpen,
    setFormStatus: state.setFormStatus,
    setFormOpen: state.setFormOpen,
  }));
  const ctaStore = useCtaStore();
  const setModal = useModalStore((state) => state.setModal);
  const setDisplay = useDisplayStore((state) => state.setDisplay);

  const handleForm = () => {
    if (formStatus) {
      setModal(<FormCancelModal />);
    } else if (!formStatus && ctaStore.ctaStatus) {
      setModal(<FormCreateModal />);
    } else if (!formStatus) {
      setDisplay('form');
      setFormStatus(!formStatus);
      ctaStore.setCtaStatus(!ctaStore.ctaStatus);
    }
  };

  return (
    <div className="space-y-[20px] p-[20px]">
      <div
        className={clsx(
          'p-[20px] border border-gray-light-active box-shadow-normal rounded-[8px] flex flex-col gap-5 hover:box-active-shadow-normal',
          { 'translate h-auto duration-300': formOpen },
          { 'translate h-[70px] duration-300': !formOpen },
        )}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <p className="b1-bold text-gray-dark-active">폼</p>
            <div className="relative flex group">
              <QuestionCircleSmall />
              <Tooltip>폼을 추가하면 CTA가 함께 추가돼요!</Tooltip>
            </div>
          </div>
          <Button onClick={() => setFormOpen(!formOpen)}>
            <SelectOptionIcon />
          </Button>
        </div>
        <div className={clsx('flex flex-col gap-5', { block: formOpen }, { hidden: !formOpen })}>
          <div className="flex flex-col gap-[20px] [&>div]:b2 [&>div]:text-gray-dark-active">
            <div key="page-header-form" className="flex items-center gap-[20px]">
              <div className="w-[20px] h-[20px] p-[2px] rounded-[8px] flex items-center justify-center bg-gray-light-normal">
                <FormSquareIcon />
              </div>
              <p>폼 추가</p>
              <div className="ml-auto">
                <Toggle isChecked={formStatus} onClick={handleForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
