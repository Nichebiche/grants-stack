import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  ...props
}: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto m-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-grey-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            className="relative bg-white rounded-3xl p-10 text-left shadow-xl transform transition-all overflow-x-auto overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {showCloseButton && (
              <button
                type="button"
                className="absolute z-20 top-6 right-6 text-grey-400 hover:text-grey-500"
                onClick={() => {
                  if (props.redirectUrl) {
                    window.location.href = props.redirectUrl;
                  }
                  onClose();
                }}
              >
                <CloseIcon className="size-5" />
              </button>
            )}
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
