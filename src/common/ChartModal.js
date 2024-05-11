import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ChartModal = (props) => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    props.cancelAction();
  };

  const chart = [
    { size: "XS", chest: 38, length: 27.5, shoulder: 16.3 },
    { size: "S", chest: 38, length: 27.5, shoulder: 16.3 },
    { size: "M", chest: 40, length: 28, shoulder: 17.0 },
    { size: "L", chest: 42, length: 28.5, shoulder: 17.8 },
    { size: "XL", chest: 44.5, length: 29, shoulder: 18.6 },
    { size: "2XL", chest: 47, length: 29.5, shoulder: 20 },
    { size: "3XL", chest: 50, length: 31.5, shoulder: 21 },
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                <div className="flex justify-between items-center p-4">
                  <p className="text-xl font-semibold">Size Chart</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => closeModal()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div class="flex items-center justify-center">
                    <div class="overflow-x-auto">
                      <table class="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                          <tr class="bg-gray-100 text-gray-700 text-lg lg:text-xl border-b border-blue-gray-200">
                            <th class="py-3 px-4 text-left">Size </th>
                            <th class="py-3 px-4 text-left">Chest (in)</th>
                            <th class="py-3 px-4 text-left">Length (in)</th>
                            <th class="py-3 px-4 text-left">Shoulder (in)</th>
                          </tr>
                        </thead>
                        <tbody class="text-blue-gray-900">
                          {chart.map((el) => (
                            <tr class="border-b border-blue-gray-200 text-center">
                              <td class="py-3 px-4">{el.size}</td>
                              <td class="py-3 px-4">{el.chest}</td>
                              <td class="py-3 px-4">{el.length}</td>
                              <td class="py-3 px-4">{el.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ChartModal;
